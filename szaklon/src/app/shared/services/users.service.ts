import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [
    {id: 1, login: 'Rafał', active: true, role: 'basic'},
    {id: 2, login: 'Michał', active: true, role: 'basic'},
    {id: 3, login: 'Zuzanna', active: true, role: 'basic'}
  ];

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(environment.baseUrl + environment.usersUrl)
    .pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  addUser(user: UserLogin): Observable<boolean | {}> {
    return this._http.post<boolean>(environment.baseUrl + environment.registerUrl, user)
    .pipe(catchError(err => {
      return this.handleError(err);
    }));
  }

  // returns true if deleted successfully
  deleteUser(user: User): Observable<boolean | {}> {
    return this._http.delete<boolean>(environment.baseUrl + environment.accountUrl + '/' + user.id)
    .pipe(catchError(err => {
      return this.handleError(err);
    }));
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
    return throwError(errorMessage);
  }
}
