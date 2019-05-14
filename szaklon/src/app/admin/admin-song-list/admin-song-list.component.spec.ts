import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSongListComponent } from './admin-song-list.component';

describe('SongListComponent', () => {
  let component: AdminSongListComponent;
  let fixture: ComponentFixture<AdminSongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
