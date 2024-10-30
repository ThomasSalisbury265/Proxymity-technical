import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/core/services/user.service';
import { IUser } from 'src/shared/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [ReactiveFormsModule]
})
export class AddUserComponent  {
  public userForm!: FormGroup;
  user: IUser = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      city: '',
      suite: '',
      zipcode: ''
    },
    phone: '',
    website: '',
  };

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router){}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      }),
      phone: [''],
      website: [''],
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: [''],
      }),
    });
  }

  onSubmit() {
    this.user.id = Math.floor(Math.random() * 1000);
    this.userService.addUser(this.user);
    this.router.navigate(['/dashboard']);
  }
}
