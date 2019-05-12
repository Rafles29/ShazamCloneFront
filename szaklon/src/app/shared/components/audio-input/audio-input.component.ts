import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-audio-input',
  templateUrl: './audio-input.component.html',
  styleUrls: ['./audio-input.component.scss']
})
export class AudioInputComponent implements OnInit {

  @ViewChild('audio')
  public audio: ElementRef;

  public source: SafeUrl = '';
  public message: string;


  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
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

    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });

    navigator.mediaDevices.getUserMedia({ audio: true})
    .then(function(stream) {
      console.log(stream);
    })
    .catch(function(err) {
      console.log(err.message);
    });
}

}
