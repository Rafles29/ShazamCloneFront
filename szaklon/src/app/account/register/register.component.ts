import { AuthenticationService } from './../../shared/services/authentication.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
    passwordRepeat: ['', [Validators.required]]
  }, { validator: this.passwordConfirming }
  );

  constructor(private toast: ToastService,
    private _formBuilder: FormBuilder,
    private _auth: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordRepeat').value) {
      return { invalid: true };
    }
  }

  register() {
    if (this.registerForm.valid) {
      this._auth.register({
        login: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
        passwordRepeat: this.registerForm.get('passwordRepeat').value
      }).subscribe(registered => {
          this.toast.success('Registered successfully');
          this._router.navigateByUrl('/login');
      }, err => {
        this.toast.error(err.error);
      });
    } else {
      if(this.registerForm.get('username').hasError('required')) {
        this.toast.error('Username is required');
      } else if(this.registerForm.get('password').hasError('required')) {
        this.toast.error('Password is required');
      } else if(this.registerForm.get('passwordRepeat').hasError('required')) {
        this.toast.error('Please repeat the password');
      } else {
        this.toast.error('Passwords must match');
      }
    }
  }

}
