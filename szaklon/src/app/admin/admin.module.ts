import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogsComponent } from './user-logs/user-logs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserLogsComponent, AddSongComponent, UserListComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
