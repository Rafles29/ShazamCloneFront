import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    NgxAudioPlayerModule,
    SharedModule
  ]
})
export class HomeModule { }
