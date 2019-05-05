import { UserLogin } from './../models/user-login.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/user-register.interface';

const TOKEN_KEY = 'Token';
const USERNAME_KEY = 'Username';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.hasToken());

  constructor(private _http: HttpClient) { }

  login(userCredentials: UserLogin): Observable<string> {
    console.log('elo')
    return this._http.post(environment.baseUrl + environment.loginUrl, userCredentials, {responseType: 'text'})
    .pipe(tap(token => {
      console.log(token);
      this.saveUser(userCredentials.login, token);
      this.loggedInSubject.next(true);
    }))
    .pipe(catchError(err => {
      this.loggedInSubject.next(false);
      console.log(err)
      return of('');
    }));
  }

  logout() {
    this._http.post(environment.baseUrl + environment.logoutUrl, null).subscribe(response => {
      this.deleteUser();
      this.loggedInSubject.next(false);
    }, err => {
      console.log(err)
    });
  }

  register(registerCredentials: UserRegister): Observable<boolean> {
    // TODO replace mock with real code

    console.log(registerCredentials)
    // MOCK
    if (registerCredentials.password.length > 3) {
      return of(true);
    } else {
      return of(false);
    }
  }

  saveUser(username: string, token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
  }

  deleteUser() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
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
}
