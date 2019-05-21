import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../models/song.model';
import { TopSong } from '../../models/top-song.model';

const SONGS_PER_ROW = 3;

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songs: Song[] | TopSong[];
  @Input() admin = false;
  @Output() changedValue = new EventEmitter<Song>();

  constructor() { }

  ngOnInit() {

  }

  OnChangeEmit(song: Song) {
    this.changedValue.emit(song);
    console.log(song);
  }

}
