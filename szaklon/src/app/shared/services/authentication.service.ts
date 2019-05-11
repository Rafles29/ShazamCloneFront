import { UserLogin } from '../models/user-login.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/user-register.model';
import { UserAuth } from '../models/user-auth';

const TOKEN_KEY = 'Token';
const USERNAME_KEY = 'Username';
const ADMIN_KEY = 'Admin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.hasToken());
  private adminSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.hasAdminPower());

  constructor(private _http: HttpClient) { }

  login(userCredentials: UserLogin): Observable<string> {

    return this._http.post(environment.baseUrl + environment.loginUrl, userCredentials, {responseType: 'text'})
    .pipe(tap(token => {
      console.log(token);
      this.saveUser(userCredentials.login, token);
    }))
    .pipe(catchError(err => {
      this.loggedInSubject.next(false);
      console.log(err);
      return of('');
    }));
  }

  login2(userCredentials: UserLogin): Observable<UserAuth> {

    return this._http.post<UserAuth>(environment.baseUrl + environment.loginUrl, userCredentials)
    .pipe(tap(res => {
      console.log(res.token);
      console.log(res.admin);
      this.saveUser(userCredentials.login, res.token, res.admin);
    }))
    .pipe(catchError(this.handleError));
  }

  logout() {
    this._http.post(environment.baseUrl + environment.logoutUrl, null).subscribe(response => {
      this.deleteUser();
    }, err => {
      console.log(err);
    });
  }

  register(registerCredentials: UserRegister): Observable<boolean> {
    // TODO replace mock with real code

    console.log(registerCredentials);
    // MOCK
    if (registerCredentials.password.length > 3) {
      return of(true);
    } else {
      return of(false);
    }
  }

  // true if account deleted
  deleteAccount(): Observable<boolean> {
    // TODO replace mock with real code

    console.log('deleting...');
    // MOCK
    this.deleteUser();
    this.loggedInSubject.next(false);
    return of(true);
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

  private saveUser(username: string, token: string, admin: boolean = false): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(ADMIN_KEY, String(admin));
    this.loggedInSubject.next(true);
    if (admin) {
      this.adminSubject.next(true);
    }
  }

  private deleteUser() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ADMIN_KEY);
    this.loggedInSubject.next(false);
    this.adminSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
  hasAdminPower(): boolean {
    let admin;
    if (admin = localStorage.getItem(ADMIN_KEY)) {
      return admin === 'true';
    } return false;
  }
}
