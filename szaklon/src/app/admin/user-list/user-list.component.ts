import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  filteredUsers: User[];
  private sorted = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }

  constructor(private _userService: UsersService, private _toaster: ToastService) {
  }

  ngOnInit() {
    this._userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

  sortBy(by: string | any): void {

    this.users.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }

  performFilter(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((user: User) =>
      user.login.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  deleteUser(user: User) {
    this._userService.deleteUser(user).subscribe(deleted => {
      if(deleted) {
        this._toaster.success('Deleted successfully');
      } else {
        this._toaster.error('Could not delete user');
      }
    }, error => {
      this._toaster.error('Something went wrong, please try again later');
    });
  }

}
