import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './components/song-list/song-list.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AudioInputComponent } from './components/audio-input/audio-input.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    SongListComponent,
    AudioInputComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    FormsModule
  ],
  exports: [
    SongListComponent,
    AudioInputComponent,
    PaginationComponent
]
})
export class SharedModule { }
