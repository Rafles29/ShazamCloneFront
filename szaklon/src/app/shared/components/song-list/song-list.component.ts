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
  songBatches: Array<Song[]> = new Array();

  constructor() { }

  ngOnInit() {
    for(let i = 0; i < this.songs.length / SONGS_PER_ROW; i++) {
      this.songBatches.push(this.songs.slice(i * SONGS_PER_ROW, (i + 1) * SONGS_PER_ROW));
    }
    console.log(this.songBatches);

  }

}
