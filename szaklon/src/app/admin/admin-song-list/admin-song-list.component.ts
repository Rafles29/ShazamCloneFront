import { Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { SongListComponent } from './../../shared/components/song-list/song-list.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Song } from 'src/app/shared/models/song.model';
import { SongsService } from 'src/app/shared/services/songs.service';
import { SearchOptions } from 'src/app/shared/models/search-options';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-admin-song-list',
  templateUrl: './admin-song-list.component.html',
  styleUrls: ['./admin-song-list.component.scss']
})
export class AdminSongListComponent implements OnInit {
  @ViewChild('pagination') paginator: PaginationComponent;
  @ViewChild('songListComponent') songListComponent: SongListComponent;

  songList: Song[];
  filteredSong: Song[];
  viewSongList: Song[];

  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredSong = this.listFilter ? this.performFilter(this.listFilter) : this.songList;
  }

  genreOptionsSelect: {value: string, label: string}[];
  artistOptionsSelect: {value: string, label: string}[];
  featuredOptionsSelect: {value: boolean, label: string}[] = [
    {
      value: true,
      label: 'Featured'
    },
    {
      value: false,
      label: 'Not featured'
    }
  ];

  options: SearchOptions = {
    genres: [],
    artists: [],
    featured: undefined
  };

  constructor(private _songs: SongsService, private _toast: ToastService) { }

  ngOnInit() {
    this.paginator.pagedList.subscribe(songs => {
      this.viewSongList = songs;
    });

    this._songs.getArtists().subscribe(artists => {
      this.artistOptionsSelect = artists.map(artist => ({value: artist, label: artist}));
    });

    this._songs.getGenres().subscribe(genres => {
      this.genreOptionsSelect = genres.map(genre => ({value: genre, label: genre}));
    });

    this.songListComponent.changedValue.subscribe(updatedSong => {
      this._songs.editSong(updatedSong).subscribe(res => {
        this.search();
      }, err => {
        this._toast.error('Song could not be updated');
      });
    });
  }

  performFilter(filterBy: string): Song[] {
    if (filterBy.length < 3) {
      return this.songList;
    }
    filterBy = filterBy.toLocaleLowerCase();
    return this.songList.filter((songs: Song) =>
      songs.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  selectFeatured(event: {value: boolean, label: string}) {
    if (this.options.featured !== undefined && this.options.featured !== null && event.value !== this.options.featured) {
      this.options.featured = null;
    } else {
      this.options.featured = event.value;
    }
  }

  deselectFeatured(event: {value: boolean, label: string}) {
    if (this.options.featured !== undefined && this.options.featured !== null && event.value === this.options.featured) {
      this.options.featured = null;
    } else {
      this.options.featured = !event.value;
    }
  }

  search() {
    console.log(this.options)
    this._songs.searchSongs(this.options).subscribe(
      songList => {
        this.songList = songList;
        this.filteredSong = this.songList;
      }
    );
  }
}
