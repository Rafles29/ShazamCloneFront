import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng-uikit-pro-standard';
import { NgModule } from '@angular/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToastModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    AccountModule,
    HomeModule,
    NavigationModule,
    AppRoutingModule,
  ],
  providers: [
    MDBSpinningPreloader,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
