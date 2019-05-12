import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor() { }

  public getMostPopularSongs(): Observable<Song[]> {
    // TODO replace mock with real code

    // MOCK
    const songs: Song[] = [
      {
        title: 'Behind Enemy Lines',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3'
      },
      {
        title: 'Big Eyes',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Big%20Eyes.mp3'
      },
      {
        title: 'Epic Boss Battle',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3'
      },
      {
        title: 'Behind Enemy Lines',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3'
      },
      {
        title: 'Big Eyes',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Big%20Eyes.mp3'
      },
      {
        title: 'Epic Boss Battle',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3'
      }
    ];

    return of(songs);
  }
}
