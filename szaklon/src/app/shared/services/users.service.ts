import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [
    {id: 1, login: 'Rafał'},
    {id: 2, login: 'Michał'},
    {id: 3, login: 'Zuzanna'}
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
