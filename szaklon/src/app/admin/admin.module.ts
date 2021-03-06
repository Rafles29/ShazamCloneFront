import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs/logs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminSongListComponent } from './admin-song-list/admin-song-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LogsComponent, AddSongComponent, UserListComponent, AddUserComponent, AdminSongListComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ]
})
export class AdminModule { }
