import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/models/song.model';
import { SongsService } from 'src/app/shared/services/songs.service';
import { SearchOptions } from 'src/app/shared/models/search-options';

@Component({
  selector: 'app-admin-song-list',
  templateUrl: './admin-song-list.component.html',
  styleUrls: ['./admin-song-list.component.scss']
})
export class AdminSongListComponent implements OnInit {

  songList: Song[];
  filteredSong: Song[];

  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredSong = this.listFilter ? this.performFilter(this.listFilter) : this.songList;
  }

  genreOptionsSelect = [
    { value: 'epic', label: 'Epic'},
    { value: 'disco', label: 'Disco' }
  ];

  artistOptionsSelect = [
    { value: 'rafael krux', label: 'Rafael Krux' },
    { value: 'zenek martyniuk', label: 'Zenek Martyniuk' }
  ];

  options: SearchOptions = {
    genre: '',
    artist: '',
    featured: false
  };

  constructor(private _songs: SongsService) { }

  ngOnInit() {
  }

  performFilter(filterBy: string): Song[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.songList.filter((songs: Song) =>
      songs.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  search() {
    this._songs.searcheSongs(this.options).subscribe(
      songList => {
        this.songList = songList;
        this.filteredSong = this.songList;
      }
    );
  }
}
