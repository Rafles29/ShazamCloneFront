import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private _toast: ToastService,
    private _formBuilder: FormBuilder,
    private _usersService: UsersService) { }

  ngOnInit() {
  }

  addUser() {
    if (this.addUserForm.valid) {
      this._usersService.addUser({
        login: this.addUserForm.get('username').value,
        password: this.addUserForm.get('password').value
      }).subscribe(token => {
          this._toast.success('User added successfully');
          this.addUserForm.reset();
      }, err => {
        this._toast.error('Could not add user, try different username');
      });
    }
  }
}
