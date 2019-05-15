import { Component, OnInit } from '@angular/core';
import { AudioRecorderService } from 'src/app/shared/services/audio-recorder.service';
import { SafeUrl } from '@angular/platform-browser';
import { ToastService } from 'ng-uikit-pro-standard';
import { FormBuilder, Validators } from '@angular/forms';
import { SongsService } from 'src/app/shared/services/songs.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  public source: SafeUrl = '';
  file: File;

  addSongForm = this._formBuilder.group({
    title: ['', Validators.required],
    artist : ['', Validators.required],
    file: [null, Validators.required],
  });

  constructor(
    private _audioRecorder: AudioRecorderService,
    private _songsService: SongsService,
    private _toast: ToastService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._audioRecorder.UrlReady.subscribe(url => {
      this.source = url;
      this.file = this._audioRecorder.getFile();
    });
  }

  showPreview(files) {
    this._audioRecorder.getUrlFromFiles(files);
  }

  addSong() {
    if (this.addSongForm.valid) {
      this._songsService.addSong({
        title: this.addSongForm.get('title').value,
        artist: this.addSongForm.get('artist').value,
        file: this.file
      }).subscribe(token => {
          this._toast.success('Song added successfully');
          this.addSongForm.reset();
      }, err => {
        this._toast.error('Something went wrong, please try again later');
      });
    }

  }

}
