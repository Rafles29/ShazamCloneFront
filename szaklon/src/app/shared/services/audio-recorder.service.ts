import { Injectable, EventEmitter } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {

  private stream: MediaStream;
  private mediaRecorder: MediaRecorder;
  private file: File; // data for server
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
          this.file = this.blobToFile(e.data, this.uniqueId());
          this.reader.readAsDataURL(e.data);
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

  getFile() {
    return this.file;
  }

  getUrlFromFiles(files): SafeUrl {
    if (files.length === 0) {
      return;
     }

     const mimeType = files[0].type;
     if (mimeType.match(/audio\/*/) == null) {
       return;
     }
     this.file = files[0];
     this.reader.readAsDataURL(this.file);
  }

  private blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;

    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  }

  private uniqueId(): string {
    return new Date().getUTCMilliseconds().toString() + '.webm';
  }
}
