import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject: BehaviorSubject<Array<IUser>> = new BehaviorSubject<Array<IUser>>([]);
  public users$: Observable<Array<IUser>> = this.usersSubject.asObservable();
  private usersUrl = `${environment.jsonPlaceholderUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers() {
    if (this.usersSubject.getValue().length > 0) {
      return of(this.usersSubject.getValue());
    } else {
    return this.http.get<IUser[]>(this.usersUrl).pipe(
      map((data) =>
        data.map((user) => ({
          ...user,
          address: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
          },
        }))
      ),
      tap((users) => {
        this.usersSubject.next(users);
      }),
      catchError((err) => throwError(err)))
    }
  }

  addUser(user: IUser) {
    const currentUsers = this.usersSubject.getValue();
    const newId = currentUsers.length
      ? Math.max(...currentUsers.map((u) => u.id)) + 1
      : 1;
    const newUser = { ...user, id: newId };
    this.usersSubject.next([...currentUsers, newUser]);
  }

  updateUser(updatedUser: IUser) {
    const currentUsers = this.usersSubject.getValue();
    const index = currentUsers.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      const updatedUsers = [...currentUsers];
      updatedUsers[index] = updatedUser;
      this.usersSubject.next(updatedUsers);
    }
  }

  deleteUser(id: number) {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.filter((user) => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }
}
