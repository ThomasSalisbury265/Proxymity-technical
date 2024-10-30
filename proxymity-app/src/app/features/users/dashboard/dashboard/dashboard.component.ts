import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/core/services/user.service';
import { IUser } from 'src/shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})
export class DashboardComponent implements OnInit {
  users$: Observable<IUser[]>;

  constructor(private userService: UserService, private router: Router) {
    this.users$ = this.userService.users$;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();
  }

  trackByUserId(index: number, user: IUser): number {
    return user.id;
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }
}
