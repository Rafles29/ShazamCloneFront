import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import {ToastService} from 'ng-uikit-pro-standard'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  username: string;
  loggedIn: boolean;
  admin: boolean;

  constructor(private toast: ToastService, private _auth: AuthenticationService) { }

  ngOnInit() {
    this._auth.isLoggedIn().subscribe(newValue => {
      this.loggedIn = newValue;
      this.username = this._auth.getUsername();
    });
    this._auth.isAdmin().subscribe(newValue => {
      this.admin = newValue;
    });
  }

  logout() {
    this._auth.logout();
    this.toast.success('zostałeś wylogowany');
  }

}
