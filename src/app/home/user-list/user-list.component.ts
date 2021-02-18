import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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




  constructor(private modalController: ModalController,public userService: UserService,public router:Router) {
  }

  ngOnInit() {
  }

  trackByFn(index: number, user: any): number {
      return user.id;
  }
  async details(id: number) {
    await this.router.navigate(['user', id]);
  }

}
