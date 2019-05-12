import { Injectable, EventEmitter } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private stream: MediaStream;
  private mediaRecorder: MediaRecorder;
  private blob: Blob; // data for server
  private audio: SafeUrl;
  private reader: FileReader;
  public UrlReady: EventEmitter<SafeUrl> = new EventEmitter();


  constructor(private _sanitizer: DomSanitizer) {
    this.reader = new FileReader();
    this.reader.onload = (_event) => {
      const result = this.reader.result.toString();
      const sanitizeUrl = this._sanitizer.bypassSecurityTrustUrl(result);
      this.audio = sanitizeUrl;
    };
    this.reader.onloadend = () => {
      this.UrlReady.emit(this.audio);
    };
   }

  init() {
    navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = e => {
        if (this.mediaRecorder.state ===  'inactive') {
          this.blob = e.data;
          this.reader.readAsDataURL(this.blob);
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

  getUrlFromFiles(files): SafeUrl {
    if (files.length === 0) {
      return;
     }

     const mimeType = files[0].type;
     if (mimeType.match(/audio\/*/) == null) {
       return;
     }
     this.blob = files[0];
     this.reader.readAsDataURL(this.blob);
  }
}
