import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from '../api/user.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  private selectedUserId: number;

  userDetail$: Observable<User>;

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public alertController:AlertController,
    public router:Router
  ) { }

  ngOnInit() {
    this.selectedUserId = this.actRoute.snapshot.params.id;
    this.userDetail$ = this.userService.getUserDetail(this.selectedUserId);
  }

async deleteUser(){

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
                this.userService.deleteUser(this.selectedUserId).subscribe(response => this.router.navigateByUrl('home'));
              }
            }
          ]
        });

        await alert.present();
}

}
