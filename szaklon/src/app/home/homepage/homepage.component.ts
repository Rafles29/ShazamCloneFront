import { AuthenticationService } from './../../shared/services/authentication.service';
import { SongsService } from './../../shared/services/songs.service';
import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { Song } from 'src/app/shared/models/song.model';
import { TopSong } from 'src/app/shared/models/top-song.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  loggedIn: boolean;
  showHistory: boolean;
  mostPopularSongs: TopSong[];
  history: Song[];

  constructor(private _songs: SongsService, private _auth: AuthenticationService) { }

  ngOnInit() {
    this._songs.getMostPopularSongs().subscribe(
      mostPopularSongs => {
        this.mostPopularSongs = mostPopularSongs;
      }
    );

    this._auth.isLoggedIn().subscribe(newValue => {
      this.loggedIn = newValue;
      if (this.loggedIn) {
        this.getHistory();
      } else {
        this.showHistory = false;
      }
    });

    this._songs.songsRecognized.subscribe(songs => {
      if(this._auth.hasToken()) {
        this.getHistory();
      }
    });
  }

  getHistory() {
    this._songs.getHistory().subscribe(history => {
      this.history = history;
    });
  }

  toggleHistory(event) {
    this.showHistory = event.target.checked;
  }

}
