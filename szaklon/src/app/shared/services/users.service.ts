import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [
    {id: 1, login: 'Rafał'},
    {id: 2, login: 'Michał'},
    {id: 3, login: 'Zuzanna'}
  ];

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: UserLogin): Observable<boolean | {}> {
    /*
    return this._http.post<boolean>(environment.baseUrl + 'users', user)
    .pipe(catchError(err => {
      return this.handleError(err);
    }));
    */
    if (user.password.length > 3) {
      return of(true);
    } else {
      return throwError('Longer');
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
