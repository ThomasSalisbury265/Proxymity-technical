import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/core/services/user.service';
import { IUser } from 'src/shared/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: IUser;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = +idParam;
        this.loadUserData();
      } else {
       console.log('Invalid user ID');
      }
    });
  }

  loadUserData() {
    this.userService.users$.subscribe((users) => {
      const foundUser = users.find((u) => u.id === this.userId);
      if (foundUser) {
        this.user = JSON.parse(JSON.stringify(foundUser));
      } else {
        console.log('User not found');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit() {
    this.userService.updateUser(this.user);
    this.router.navigate(['/dashboard']);
  }
}
