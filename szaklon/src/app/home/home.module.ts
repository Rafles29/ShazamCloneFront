import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro
  ]
})
export class HomeModule { }
