import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  declarations: [HomepageComponent, SongListComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    NgxAudioPlayerModule
  ]
})
export class HomeModule { }
