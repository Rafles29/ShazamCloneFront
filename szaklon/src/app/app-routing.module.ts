import { LogsComponent } from './admin/logs/logs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { AddSongComponent } from './admin/add-song/add-song.component';
import {AdminSongListComponent} from './admin/admin-song-list/admin-song-list.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'admin/users/add', component: AddUserComponent, canActivate: [AdminGuard]},
  { path: 'admin/songs', component: AdminSongListComponent, canActivate: [AdminGuard]},
  { path: 'admin/songs/add', component: AddSongComponent, canActivate: [AdminGuard]},
  { path: 'admin/logs', component: LogsComponent, canActivate: [AdminGuard] },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
