import { SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';
import { SongForm } from '../models/song-form.model';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private _http: HttpClient) { }

  public getMostPopularSongs(): Observable<Song[]> {
    // TODO replace mock with real code

    // MOCK
    const songs: Song[] = [
      {
        title: 'Behind Enemy Lines',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
        genre: 'Epic'
      },
      {
        title: 'Big Eyes',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Big%20Eyes.mp3',
        genre: 'Epic'
      },
      {
        title: 'Epic Boss Battle',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
        genre: 'Epic'
      },
      {
        title: 'Behind Enemy Lines',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
        genre: 'Epic'
      },
      {
        title: 'Epic Boss Battle',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
        genre: 'Epic'
      }
    ];

    return of(songs);
  }

  public getSongs(): Observable<Song[]> {
        // TODO replace mock with real code

    // MOCK
    const songs: Song[] = [
      {
        title: 'Behind Enemy Lines',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
        genre: 'Epic'
      },
      {
        title: 'Big Eyes',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Big%20Eyes.mp3',
        genre: 'Epic'
      },
      {
        title: 'Epic Boss Battle',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
        genre: 'Epic'
      },
      {
        title: 'Behind Enemy Lines',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
        genre: 'Epic'
      },
      {
        title: 'Big Eyes',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Big%20Eyes.mp3',
        genre: 'Epic'
      },
      {
        title: 'Epic Boss Battle',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
        genre: 'Epic'
      },
      {
        title: 'test',
        artist: 'Rafael Krux',
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
        genre: 'Epic'
      }
    ];

    return of(songs);
  }

  public getHistory(): Observable<Song[]> {
    return this._http.get<Song[]>(environment.baseUrl + environment.historyUrl);
  }

  addSong(song: SongForm): Observable<Song | {}> {
    // TODO replace mock with real code
    console.log(song);
    if (song.file.name.length > 0 && song.artist.length > 3) {
      return of({
        title: song.title,
        artist: song.artist,
        audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3'
      });
    } else {
      return throwError('Bad Request');
    }
  }

  public recognize(song): Observable<Song> {
    // TODO replace mock with real code like the one below
    // return this._http.post<Song>(environment.baseUrl + environment.recognizeUrl, song);

    // MOCK
    const match: Song = {
      title: 'Behind Enemy Lines',
      artist: 'Rafael Krux',
      audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
      genre: 'Epic'
    }

    return of(match);
  }
}
