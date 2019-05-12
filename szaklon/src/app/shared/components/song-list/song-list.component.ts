import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songs: Song[];

  constructor() { }

  ngOnInit() {
  }

}
