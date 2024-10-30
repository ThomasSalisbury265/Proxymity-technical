import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/users/dashboard/dashboard/dashboard.component';
import { UsersModule } from './features/users/users.module';
import { EditUserComponent } from './features/users/edit/edit-user/edit-user.component';
import { AddUserComponent } from './features/users/add/add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UsersModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
