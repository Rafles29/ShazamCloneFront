import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string;

  constructor(private toast: ToastService, private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() {
    this.username = this._auth.getUsername();
  }

  deleteAccount() {
    this._auth.deleteAccount().subscribe(response => {
        this.toast.success('Account deleted')
        this._router.navigateByUrl('/');
    }, error => {
        this.toast.error('Could not delete account')
    });
  }

}
