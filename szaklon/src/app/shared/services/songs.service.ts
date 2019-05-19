import { SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Song } from '../models/song.model';
import { SongForm } from '../models/song-form.model';
import { SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_PADDING_X } from '@angular/material';
import { SearchOptions } from '../models/search-options';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private _http: HttpClient) { }

  private songs: Song[] = [
    {
      title: 'Behind Enemy Lines',
      artist: 'Rafael Krux',
      audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
      genre: 'Epic',
      featured: true
    },
    {
      title: 'Big Eyes',
      artist: 'Rafael Krux',
      audioUrl: 'https://freepd.com/music/Big%20Eyes.mp3',
      genre: 'Epic',
      featured: false
    },
    {
      title: 'Epic Boss Battle',
      artist: 'Rafael Krux',
      audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
      genre: 'Epic',
      featured: false
    },
    {
      title: 'Behind Enemy Lines',
      artist: 'Rafael Krux',
      audioUrl: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3',
      genre: 'Epic',
      featured: false
    },
    {
      title: 'Epic Boss Battle',
      artist: 'Zenek Martyniuk',
      audioUrl: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3',
      genre: 'Disco',
      featured: false
    }
  ];


  public getMostPopularSongs(): Observable<Song[]> {
    // TODO replace mock with real code


    return of(this.songs);
  }

  public getSongs(): Observable<Song[]> {
        // TODO replace mock with real code

    return of(this.songs);
  }

  public searcheSongs(options: SearchOptions): Observable<Song[]> {
    return of(this.performFilter(options));
  }

  public getHistory(): Observable<Song[]> {
    return this._http.get<Song[]>(environment.baseUrl + environment.historyUrl);
  }

  public addSong(songs: SongForm[]): Observable<Song[] | {}> {
    // TODO replace mock with real code

    // MOCK
    if (songs.length > 0) {
      return of(songs);
    } else {
      return throwError('Bad Request');
    }
  }

  public addSongs(songs: Song[]): Observable<Song[] | {}> {
    // TODO replace mock with real code

    // MOCK
    if (songs.length > 0) {
      return of(songs);
    } else {
      return throwError('Bad Request');
    }
  }

  public recognize(song): Observable<Song[]> {
    // TODO replace mock with real code like the one below
    // return this._http.post<Song[]>(environment.baseUrl + environment.recognizeUrl, song);

    // MOCK
    const matches: Song[] = this.songs.slice(0, 4);

    return of(matches);
  }

  private performFilter(options: SearchOptions): Song[] {
    return this.songs.filter((songs: Song) =>
      songs.artist.toLocaleLowerCase().indexOf(options.artist) !== -1 &&
      songs.genre.toLocaleLowerCase().indexOf(options.genre) !== -1 &&
      songs.featured !== true);
  }

}
