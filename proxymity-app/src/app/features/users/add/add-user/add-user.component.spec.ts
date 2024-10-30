import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/core/services/user.service';
import { AddUserComponent } from './add-user.component';
import { of } from 'rxjs';
import { IUser } from 'src/shared/models/user.model';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['addUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.get('name')?.value).toBe('');
    expect(component.userForm.get('username')?.value).toBe('');
    expect(component.userForm.get('email')?.value).toBe('');
    expect(component.userForm.get('address.street')?.value).toBe('');
    expect(component.userForm.get('address.city')?.value).toBe('');
  });

  it('should have required validators for name, username, and email', () => {
    const nameControl = component.userForm.get('name');
    const usernameControl = component.userForm.get('username');
    const emailControl = component.userForm.get('email');

    nameControl?.setValue('');
    usernameControl?.setValue('');
    emailControl?.setValue('');

    expect(nameControl?.valid).toBeFalse();
    expect(usernameControl?.valid).toBeFalse();
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should call addUser on the UserService and navigate to dashboard on form submit', () => {
    const mockUser: IUser = {
      id: 1,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      address: {
        street: '123 Test St',
        city: 'Test City',
        suite: '',
        zipcode: ''
      },
      phone: '',
      website: '',
    };

    component.user = mockUser;

    component.onSubmit();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(mockUser);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should disable submit button if form is invalid', () => {
    component.userForm.get('name')?.setValue('');
    component.userForm.get('username')?.setValue('');
    component.userForm.get('email')?.setValue('');

    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });
});
