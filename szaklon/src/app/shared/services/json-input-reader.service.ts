import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class JsonInputReaderService{



  public jsonReady: EventEmitter<Object[]> = new EventEmitter();
  public error: EventEmitter<string> = new EventEmitter();
  private fileReader: FileReader;

  constructor() {

  }

  init(): void {
    this.fileReader = new FileReader();
    this.fileReader.onload = () => {
      const json = JSON.parse(this.fileReader.result.toString());
      this.jsonReady.emit(json);
     };
    this.fileReader.onerror = (error) => {
      this.error.emit('File Reader error');
    };
  }

  getJson(file: File) {
    const mimeType = file.type;
    if (mimeType.match(/application\/json/) == null) {
      this.error.emit('Wrong mime type');
      return;
    }
    this.fileReader.readAsText(file, 'UTF-8');
  }
}
