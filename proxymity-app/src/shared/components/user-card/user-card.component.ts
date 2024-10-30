import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { IUser } from 'src/shared/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  providers: [BrowserModule]
})
export class UserCardComponent {
  @Input() user!: IUser;

  constructor(private userService: UserService, private router: Router) {}

  onEdit() {
    this.router.navigate(['/users/edit', this.user.id]);
  }

  onDelete() {
    if (confirm(`Are you sure you want to delete ${this.user.name}?`)) {
      this.userService.deleteUser(this.user.id);
    }
  }
}
