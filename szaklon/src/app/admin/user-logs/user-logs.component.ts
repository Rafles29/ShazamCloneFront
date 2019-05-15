import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/shared/services/logs.service';
import { Log } from 'src/app/shared/models/log-model';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.scss']
})
export class UserLogsComponent implements OnInit {

  logs: Log[];
  private sorted = false;

  constructor(private _logService: LogsService) { }

  ngOnInit() {
    this._logService.getLogs().subscribe(logs =>{
      this.logs = logs;

    });
  }

  sortBy(by: string | any): void {

    this.logs.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });
  }


}
