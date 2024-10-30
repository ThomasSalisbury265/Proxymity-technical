import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add/add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EditUserComponent } from './edit/edit-user/edit-user.component';



@NgModule({
  declarations: [
    AddUserComponent,
    DashboardComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
