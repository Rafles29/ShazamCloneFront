import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
