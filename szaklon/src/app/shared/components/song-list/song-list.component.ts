import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../models/song.model';

const SONGS_PER_ROW = 3;

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songs: Song[];
  @Input() admin = false;

  constructor() { }

  ngOnInit() {

  }

}
