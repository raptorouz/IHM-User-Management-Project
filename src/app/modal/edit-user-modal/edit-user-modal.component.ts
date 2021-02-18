import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {


  user:User;

    @Input()
    currentFirstname: string;
    @Input()
    currentLastname: string;
    @Input()
    currentEmail: string;
    @Input()
  selectedUserId: any;
  @Input()
  avatar: any;


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
    editUser() {

        this.user = {
            id: this.selectedUserId,
            first_name: this.currentFirstname,
            last_name: this.currentLastname,
            email: this.currentEmail,
            avatar: this.avatar
        };


        this.userService.editUser(this.user).subscribe(newUser => {
                this.displayToastNotification('User edited successfully');

                this.modalController.dismiss(this.user);

            });


    }


}
