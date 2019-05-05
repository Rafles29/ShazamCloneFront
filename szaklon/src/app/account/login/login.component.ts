import { UserLogin } from './../../shared/models/user-login.interface';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _formBuilder: FormBuilder, private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() { }

  login() {
    this._auth.login({
      login: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }).subscribe(token => {
      if (token !== '') {
        this._router.navigateByUrl('/');
      }
    });
  }
}
