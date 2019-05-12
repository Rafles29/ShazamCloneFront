import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-audio-input',
  templateUrl: './audio-input.component.html',
  styleUrls: ['./audio-input.component.scss']
})
export class AudioInputComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;

  public source: SafeUrl = '';
  public message: string;
  stream: MediaStream;
  mediaRecorder: MediaRecorder;
  audioChunks: any[];
  recording: boolean = false;
  blob: Blob; //data for server


  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = e => { 
        if(this.mediaRecorder.state ==  'inactive') {
          this.blob = e.data;  
          const reader = new FileReader();
          reader.readAsDataURL(this.blob);
          reader.onload = (_event) => {
            const result = reader.result.toString();      
            const sanitizeUrl = this._sanitizer.bypassSecurityTrustUrl(result);
            this.source = sanitizeUrl;
            console.log(this.source);
          }
        }
      }
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }


  showPreview(files) {

    if (files.length === 0) {
     return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/audio\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      const result = reader.result.toString();
      const sanitizeUrl = this._sanitizer.bypassSecurityTrustUrl(result);
      this.source = sanitizeUrl;
    };
  }

  public recordAudio() {
    if(this.mediaRecorder.state =='recording') {
      this.mediaRecorder.stop();
      console.log('stop');
      
    }
    else {
      this.mediaRecorder.start();
      console.log('start');      
    }
  }

}
