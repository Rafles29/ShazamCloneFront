import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  playlist: Track[] = [
    {
      title: 'Behind Enemy Lines',
      link: 'https://freepd.com/music/Behind%20Enemy%20Lines.mp3'
    },
    {
      title: 'Big Eyes',
      link: 'https://freepd.com/music/Big%20Eyes.mp3'
    },
    {
      title: 'Epic Boss Battle',
      link: 'https://freepd.com/music/Epic%20Boss%20Battle.mp3'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
