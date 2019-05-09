import { UserLogin } from '../../shared/models/user-login.model';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private toast: ToastService, private _formBuilder: FormBuilder, private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() { }

  login() {
    this._auth.login({
      login: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).subscribe(token => {
      if (token !== '') {
        // TODO toaster
        this.toast.success("Logowanie powiodło się")
        this._router.navigateByUrl('/');
      } else {
        // TODO jakiś error
        this.toast.error("Logowanie nie powiodło się")
        console.log('nie udalo sie zalogowac')
      }
    });
  }
}
