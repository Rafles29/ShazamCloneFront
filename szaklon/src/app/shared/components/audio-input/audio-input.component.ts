import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';
import { AudioRecorderService } from '../../services/audio-recorder.service';


@Component({
  selector: 'app-audio-input',
  templateUrl: './audio-input.component.html',
  styleUrls: ['./audio-input.component.scss']
})
export class AudioInputComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;

  public source: SafeUrl = '';
  private recording = false;
  blob: Blob;

  constructor(private _sanitizer: DomSanitizer, private _audioRecorder: AudioRecorderService) { }

  ngOnInit() {
    this._audioRecorder.init();
    this._audioRecorder.UrlReady.subscribe(url => {
      this.source = url;
      this.blob = this._audioRecorder.getFile();
      console.log(this.blob);
    });
  }


  showPreview(files) {
    this._audioRecorder.getUrlFromFiles(files);
  }

  public recordAudio() {
    if (this.recording) {
      this._audioRecorder.stopRecording();
      this.recording = false;
      console.log('stop');
    } else {
      this._audioRecorder.startRecording();
      this.recording = true;
      console.log('start');
    }
  }

}
