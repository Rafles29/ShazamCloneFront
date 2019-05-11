import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './components/song-list/song-list.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    SongListComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro
  ],
  exports: [SongListComponent]
})
export class SharedModule { }
