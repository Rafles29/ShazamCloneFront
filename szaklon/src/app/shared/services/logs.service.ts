import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Log } from '../models/log-model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private logs: Log[] = [
    {id: 1, action: 'LogIn success', date: new Date('2018-04-10 11:15:55'), username: 'admin', ip: '127.0.0.1'},
    {id: 2, action: 'LogIn Error', date: new Date('2018-04-10 11:15:38')  , username: 'admin', ip: '127.0.0.1'},
    {id: 3, action: 'LogIn Error', date: new Date('2018-04-09 21:00:22')  , username: 'admin', ip: '127.0.0.1'},
    {id: 4, action: 'LogIn success', date: new Date('2018-04-09 16:40:20'), username: 'admin', ip: '127.0.0.1'},
    {id: 5, action: 'LogIn success', date: new Date('2018-04-09 15:12:00'), username: 'admin', ip: '127.0.0.1'},
  ];

  constructor(private _http: HttpClient) { }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }
}
