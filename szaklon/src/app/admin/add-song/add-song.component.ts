import { Component, OnInit } from '@angular/core';
import { AudioRecorderService } from 'src/app/shared/services/audio-recorder.service';
import { SafeUrl } from '@angular/platform-browser';
import { ToastService } from 'ng-uikit-pro-standard';
import { FormBuilder, Validators } from '@angular/forms';
import { SongsService } from 'src/app/shared/services/songs.service';
import { Song } from 'src/app/shared/models/song.model';
import { JsonInputReaderService } from 'src/app/shared/services/json-input-reader.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  public source: SafeUrl = '';
  file: File;
  songs: Song[];

  addSongForm = this._formBuilder.group({
    title: ['', Validators.required],
    artist : ['', Validators.required],
    file: [null, Validators.required],
    genre: ['', Validators.required]
  });

  addJsonForm = this._formBuilder.group({
    json: [null, Validators.required]
  });

  constructor(
    private _audioRecorder: AudioRecorderService,
    private _songsService: SongsService,
    private _toast: ToastService,
    private _formBuilder: FormBuilder,
    private _jsonInputReader: JsonInputReaderService) { }

  ngOnInit() {
    this._audioRecorder.UrlReady.subscribe(url => {
      this.source = url;
      this.file = this._audioRecorder.getFile();
    });
    this._jsonInputReader.init();
    this._jsonInputReader.jsonReady.subscribe(json => {
      this.songs = json;
      console.log(this.songs);
    });
    this._jsonInputReader.error.subscribe(error => {
      this._toast.error(error);
    });
  }

  showPreview(files) {
    this._audioRecorder.getUrlFromFiles(files);
  }

  showJson(files) {
    if (files.length === 0) {
      return;
    }
    this._jsonInputReader.getJson(files[0]);
  }

  addSong() {
    if (this.addSongForm.valid) {
      this._songsService.addSong([{
        title: this.addSongForm.get('title').value,
        artist: this.addSongForm.get('artist').value,
        genre: this.addSongForm.get('genre').value,
        file: this.file
      }]).subscribe(token => {
          this._toast.success('Song added successfully');
          this.addSongForm.reset();
      }, err => {
        this._toast.error('Something went wrong, please try again later');
      });
    }
  }

  addSongs() {
    if (this.addJsonForm.valid) {
      this._songsService.addSongs(this.songs).subscribe(token => {
          this._toast.success('Song added successfully');
          this.addJsonForm.reset();
      }, err => {
        this._toast.error('Something went wrong, please try again later');
      });
    }
  }

}
