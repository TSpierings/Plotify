import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistCarouselComponent } from './playlist-carousel/playlist-carousel.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import { TrackListComponent } from './track-list/track-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PlaylistsComponent,
    PlaylistCarouselComponent,
    PlaylistDetailsComponent,
    TrackListComponent
  ]
})
export class PlaylistsModule { }
