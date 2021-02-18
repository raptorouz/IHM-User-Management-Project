import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {


user:User;

  currentFirstname: string;
  currentLastname: string;
  currentEmail: string;


  constructor(
      private modalController: ModalController,
      private userService: UserService,
      private toastController: ToastController) {
  }

  ngOnInit() {
  }

  /**
   * Display a Toast notification to the user with a custom message
   */
  async displayToastNotification(customMessage: string, customColor: string = 'primary') {
      const toast = await this.toastController.create({
          color: customColor,
          position: 'top',
          duration: 2000,
          message: customMessage,
      });

      await toast.present();
  }

  /**
   * Cancel and go back to previous page
   */
  dismissModal() {
      this.modalController.dismiss();
  }

  /**
   *
   */
  addUser() {

      this.user = {
          id: null,
          first_name: this.currentFirstname,
          last_name: this.currentLastname,
          email: this.currentEmail,
          avatar: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
      };


      this.userService.postAddUser(this.user).subscribe(newUser => {
              this.displayToastNotification('User added successfully');
              this.user.id=newUser.id;
              this.modalController.dismiss(this.user);
          });


  }



}
