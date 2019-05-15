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
    {id: 1, action: 'LogIn success', date: new Date('2018-04-10')},
    {id: 2, action: 'LogIn Error', date: new Date('2018-04-10')},
    {id: 3, action: 'LogIn Error', date: new Date('2018-04-09')},
    {id: 4, action: 'LogIn success', date: new Date('2018-04-09')},
    {id: 5, action: 'LogIn success', date: new Date('2018-04-09')},
  ];

  constructor(private _http: HttpClient) { }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }
}
