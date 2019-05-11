import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',        component: RegisterComponent },
  { path: 'profile',        component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '',   component: HomepageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
