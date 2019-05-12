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
  public message: string;
  recording = false;


  constructor(private _sanitizer: DomSanitizer, private _audioRecorder: AudioRecorderService) { }

  ngOnInit() {
    this._audioRecorder.init();
    this._audioRecorder.UrlReady.subscribe(url => {
      console.log('url');
      this.source = url;
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
      this.source = this._audioRecorder.getAudio();
    } else {
      this._audioRecorder.startRecording();
      this.recording = true;
      console.log('start');
    }
  }

}
