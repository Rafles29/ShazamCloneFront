import { UserLogin } from '../../shared/models/user-login.model';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';
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
  returnUrl: string;

  constructor(private toast: ToastService,
    private _formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this._auth.login({
      login: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).subscribe(token => {
      if (token !== '') {
        // TODO toaster
        this.toast.success('Logowanie powiodło się');
        this._router.navigate([this.returnUrl]);
      } else {
        // TODO jakiś error
        this.toast.error('Logowanie nie powiodło się');
      }
    });
  }
}
