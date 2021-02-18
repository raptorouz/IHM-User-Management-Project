import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../api/user.service';
import { User } from '../interface/user';
import { AddUserModalComponent } from '../modal/add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from '../modal/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  subject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  userList$: Observable<User[]> = this.subject.asObservable();

  constructor(        public router: Router,
        public userService: UserService,
        public modalController: ModalController
) {}
  ngOnInit(): void {
    this.userService.getUserList().subscribe(users => this.subject.next(users));
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
  refreshDelete(id:number){
    this.userList$ = this.userList$.pipe(
      map( userArr=> userArr.filter(user=>user.id != id))
    );
  }

  async addUserModal() {
    const modal = await this.modalController.create({
        component: AddUserModalComponent
    });

    modal.onDidDismiss()
        .then(data => {
                if (data.data) {
                  let futureArr:User[];
                   this.userList$.subscribe(arr =>{ futureArr = arr;});
                  this.subject.next([...futureArr,data.data]);
                }
            }
        );
    await modal.present();
}

  async editUserModal(user:User){
    const modal = await this.modalController.create({
        component: EditUserModalComponent,
        componentProps: {
    currentFirstname: user.first_name,
    currentLastname: user.last_name,
    currentEmail:user.email,
    selectedUserId: user.id,
    avatar:user.avatar
}

    });

    modal.onDidDismiss()
        .then(data => {
                if (data.data) {
                  let futureArr:User[];
                   this.userList$.subscribe(arr =>{ futureArr = arr;});
                   const toChangeIndex = futureArr.findIndex(user => user.id == data.data.id);
                   console.log(data.data);
                   futureArr[toChangeIndex] = data.data;
                  this.subject.next(futureArr);
                  console.log(futureArr);
                }
            }
        );
    await modal.present();
  }
}
