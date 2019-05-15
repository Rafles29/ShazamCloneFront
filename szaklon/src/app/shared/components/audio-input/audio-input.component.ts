import { SongsService } from './../../services/songs.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';
import { AudioRecorderService } from '../../services/audio-recorder.service';
import { ToastService } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-audio-input',
  templateUrl: './audio-input.component.html',
  styleUrls: ['./audio-input.component.scss']
})
export class AudioInputComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('audioInput') audioInput: ElementRef;

  public source: SafeUrl = '';
  private recording = false;
  file: File;
  private blob: Blob;
  isRecording = false;
  fileValid: boolean;

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
      console.log(this.file);
      this.fileValid = true;
    });

    this._audioRecorder.wrongType.subscribe(message => {
      this._toast.error(message);
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
      console.log('stop');
      this.audioInput.nativeElement.value = null;
      
    } else {
      this.isRecording = true;
      this._audioRecorder.startRecording();
      this.recording = true;
      console.log('start');
    }
  }

  recognize() {
    console.log(this.file);
    console.log(this.source);
    this._songs.recognize(this.blob).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);

    })
  }

}
