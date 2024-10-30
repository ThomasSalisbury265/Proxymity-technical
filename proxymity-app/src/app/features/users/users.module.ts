import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add/add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EditUserComponent } from './edit/edit-user/edit-user.component';
import { UserCardComponent } from 'src/shared/components/user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AddUserComponent,
    DashboardComponent,
    EditUserComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ]
})
export class UsersModule { }
