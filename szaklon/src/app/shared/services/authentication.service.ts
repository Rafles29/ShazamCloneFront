import { UserAuth } from './../models/user-auth';
import { UserLogin } from '../models/user-login.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/user-register.model';

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

  login(userCredentials: UserLogin): Observable<UserAuth> {

    return this._http.post<UserAuth>(environment.baseUrl + environment.loginUrl, userCredentials)
    .pipe(tap(res => {
      this.saveUser(userCredentials.login, res.token, res.is_admin);
    }))
    .pipe(catchError(err => {
      this.loggedInSubject.next(false);
      return this.handleError(err);
    }));
  }

  logout() {
    this._http.post(environment.baseUrl + environment.logoutUrl, null).subscribe(response => {
      this.deleteUser();
    }, err => {
      this.deleteUser();
    });
  }

  register(registerCredentials: UserRegister): Observable<boolean> {
    return this._http.post<boolean>(environment.baseUrl + environment.registerUrl, {
      login: registerCredentials.login,
      password: registerCredentials.password
    });
  }

  // true if account deleted
  deleteAccount(): Observable<boolean | {}> {
    return this._http.delete<boolean>(environment.baseUrl + environment.accountUrl)
    .pipe(tap(response => {
      this.deleteUser();
      this.loggedInSubject.next(false);
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

  isAdmin(): Observable<boolean> {
    return this.adminSubject.asObservable();
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
