import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    RouterModule
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
