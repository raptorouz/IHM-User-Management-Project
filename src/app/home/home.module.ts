import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserModalComponent } from '../modal/add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from '../modal/edit-user-modal/edit-user-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,UserListComponent,AddUserModalComponent,EditUserModalComponent]
})
export class HomePageModule {}
