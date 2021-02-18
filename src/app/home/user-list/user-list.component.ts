import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { User } from 'src/app/interface/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {

  @Input()
  userList: User;


@Output()
  deletedUser= new EventEmitter<number>();

@Output()
  addUserClicked = new EventEmitter<any>();

  @Output()
  editUserClicked= new EventEmitter<User>();

  constructor(private modalController: ModalController,
    public userService: UserService,public router:Router,
  public alertController:AlertController) {
  }

  ngOnInit() {
  }

  trackByFn(index: number, user: any): number {
      return user.id;
  }
  async details(id: number) {
    await this.router.navigate(['user', id]);
  }

  async deleteUser(id:number){

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Are you sure you want to delete this item ?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Yes',
            handler: () => {
              this.userService.deleteUser(id).subscribe(response => this.deletedUser.emit(id));
            }
          }
        ]
      });

      await alert.present();

  }

  addUser(){
    this.addUserClicked.emit();
  }
  editUser(clickedUser:User){
    this.editUserClicked.emit(clickedUser);
  }

}
