import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './components/song-list/song-list.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AudioInputComponent } from './components/audio-input/audio-input.component';

@NgModule({
  declarations: [
    SongListComponent,
    AudioInputComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro
  ],
  exports: [SongListComponent,
  AudioInputComponent]
})
export class SharedModule { }
