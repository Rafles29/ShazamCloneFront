import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    AccountModule,
    HomeModule,
    NavigationModule,
  ],
  providers: [
    MDBSpinningPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
