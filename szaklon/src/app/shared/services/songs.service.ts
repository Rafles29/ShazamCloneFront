import { AddSong } from './../models/add-song.model';
import { SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Song } from '../models/song.model';
import { SELECT_PANEL_INDENT_PADDING_X, SELECT_PANEL_PADDING_X } from '@angular/material';
import { SearchOptions } from '../models/search-options';
import { TopSong } from '../models/top-song.model';
import { tap, catchError } from 'rxjs/operators';
import { ToastService } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private popularLimit = 6;
  private recognizeLimit = 4;

  @Output() songsRecognized: EventEmitter<Song[]> = new EventEmitter(true);
  @Output() songRecognizeError: EventEmitter<string> = new EventEmitter(true);
  constructor(private _http: HttpClient) { }

  public getMostPopularSongs(): Observable<TopSong[]> {
    return this._http.get<TopSong[]>(environment.baseUrl + environment.popularUrl + '/' + this.popularLimit);
  }

  public getArtists(): Observable<string[]> {
    return this._http.get<string[]>(environment.baseUrl + environment.artistsUrl);
  }

  public getGenres(): Observable<string[]> {
    return this._http.get<string[]>(environment.baseUrl + environment.genresUrl);
  }

  public searchSongs(options: SearchOptions): Observable<Song[]> {
    return this._http.post<Song[]>(environment.baseUrl + environment.songsUrl, options);
  }

  public getHistory(): Observable<Song[]> {
    return this._http.get<Song[]>(environment.baseUrl + environment.historyUrl);
  }

  public editSong(song: Song): Observable<void> {
    return this._http.post<void>(environment.baseUrl + environment.editSongUrl, song);
  }

  public addSongs(songs: AddSong[]): Observable<void> {
    return this._http.post<void>(environment.baseUrl + environment.addSongUrl, songs);
  }

  public recognize(song): void {
    const reader = new FileReader();
    const httpClient = this._http;

    reader.onloadend = () => {
      const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });
      httpClient.post<Song[]>(environment.baseUrl + environment.recognizeUrl + '/' + this.recognizeLimit, reader.result, { headers: headers })
      .subscribe(songs => {
          console.log(songs);
          this.songsRecognized.emit(songs);
        }, err => {
          this.songRecognizeError.emit('No song could be matched');
          console.log(err);
        }
      );
    }

    reader.readAsArrayBuffer(song);
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
