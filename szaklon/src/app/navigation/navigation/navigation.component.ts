import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  username: string;
  loggedIn: boolean;

  constructor(private _auth: AuthenticationService) { }

  ngOnInit() {
    this._auth.isLoggedIn().subscribe(newValue => {
      this.loggedIn = newValue;
      this.username = this._auth.getUsername();
    });
  }

  logout() {
    this._auth.logout();
  }

}
