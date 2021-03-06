import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/shared/services/logs.service';
import { Log } from 'src/app/shared/models/log-model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: Log[];
  filteredLogs: Log[];
  private sorted = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredLogs = this.listFilter ? this.performFilter(this.listFilter) : this.logs;
  }

  constructor(private _logService: LogsService) { }

  ngOnInit() {
    this._logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.filteredLogs = logs;
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

  performFilter(filterBy: string): Log[] {
    if (filterBy.length < 3) {
      return this.logs;
    }
    filterBy = filterBy.toLocaleLowerCase();
    return this.logs.filter((log: Log) =>
      log.login.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      (log.logging_succession ? 'Login success' : 'Login error').toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      log.logging_time.toLocaleString('pl-PL').indexOf(filterBy) !== -1 ||
      log.ip_addr.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      log.os.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      log.browser.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
