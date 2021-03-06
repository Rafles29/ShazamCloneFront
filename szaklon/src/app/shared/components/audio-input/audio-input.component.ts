import { Song } from 'src/app/shared/models/song.model';
import { SongsService } from './../../services/songs.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';
import { AudioRecorderService } from '../../services/audio-recorder.service';
import { ToastService, CollapseComponent } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-audio-input',
  templateUrl: './audio-input.component.html',
  styleUrls: ['./audio-input.component.scss']
})
export class AudioInputComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('audioInput') audioInput: ElementRef;
  @ViewChild(CollapseComponent) matchedSongContainer: CollapseComponent;

  public source: SafeUrl = '';
  private recording = false;
  file: File;
  private blob: Blob;
  isRecording = false;
  fileValid: boolean;
  topMatchedSong: Song;
  otherMatchedSongs: Song[];
  loading: boolean;

  constructor(
    private _sanitizer: DomSanitizer,
    private _audioRecorder: AudioRecorderService,
    private _songs: SongsService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    this._audioRecorder.init();
    this._audioRecorder.UrlReady.subscribe(url => {
      this.source = url;
      this.file = this._audioRecorder.getFile();
      this.blob = this._audioRecorder.getBlob();
      this.fileValid = true;
    });

    this._audioRecorder.wrongType.subscribe(message => {
      this._toast.error(message);
    });

    this._songs.songsRecognized.subscribe(songs => {
      this.showRecognized(songs);
    });

    this._songs.songRecognizeError.subscribe(message => {
      this.recognizeError(message);
    });
  }


  showPreview(files) {
    this._audioRecorder.getUrlFromFiles(files);
  }

  public recordAudio() {
    if (this.recording) {
      this.isRecording = false;
      this._audioRecorder.stopRecording();
      this.recording = false;
      this.audioInput.nativeElement.value = null;
    } else {
      this.isRecording = true;
      this._audioRecorder.startRecording();
      this.recording = true;
    }
  }

  recognizeError(message: string) {
    this._toast.error(message);
    this.loading = false;
  }

  recognize() {
    this.loading = true;
    this.matchedSongContainer.hide();
    console.log(this.file.slice(0));
    this._songs.recognize(this.file.slice(0));

  }

  showRecognized(matchedSongs: Song[]) {
    console.log(matchedSongs);
    this.topMatchedSong = matchedSongs[0];
    this.otherMatchedSongs = matchedSongs.slice(1);
    this.loading = false;

    this.matchedSongContainer.show();
  }

}
