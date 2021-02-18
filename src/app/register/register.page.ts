import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


        email: string;
        password: string;
        login$: Subscription;

        constructor(
            public router: Router,
            public userService: UserService,
            private toastController: ToastController
        ) {
        }


        ngOnDestroy(): void {
            if (this.login$) {
                this.login$.unsubscribe();
            }
        }

        ngOnInit() {
        }

        /**
         * Display a Toast notification to the user with a custom message
         */
        async displayToastNotification(customMessage: string) {
            const toast = await this.toastController.create({
                color: 'danger',
                position: 'top',
                duration: 2000,
                message: customMessage,
            });

            await toast.present();
        }

        /**
         * Login function that is called by login button
         */
        register() {
            this.login$ = this.userService.login(this.email, this.password).subscribe(
                isLogged => {
                    if (isLogged) {
                        this.router.navigateByUrl('home');
                    } else {
                        this.displayToastNotification('Cannot register this account (see reqres.in REGISTER-SUCCESFULL section)');
                    }

                }
            );

        }

}
