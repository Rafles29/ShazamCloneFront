import { Injectable } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private stream: MediaStream;
  private mediaRecorder: MediaRecorder;
  private blob: Blob; // data for server
  private audio: SafeUrl;


  constructor(private _sanitizer: DomSanitizer) { }

  init() {
    navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = e => {
        if (this.mediaRecorder.state ===  'inactive') {
          this.blob = e.data;
          const reader = new FileReader();
          reader.readAsDataURL(this.blob);
          reader.onload = (_event) => {
            const result = reader.result.toString();
            const sanitizeUrl = this._sanitizer.bypassSecurityTrustUrl(result);
            this.audio = sanitizeUrl;
            console.log(this.audio);
          };
        }
      };
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }
  startRecording() {
    this.mediaRecorder.start();
  }
  stopRecording() {
    this.mediaRecorder.stop();
  }

  getBlob() {
    return this.blob;
  }

  getAudio() {
    return this.audio;
  }
}
