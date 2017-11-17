import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistCarouselComponent } from './playlist-carousel/playlist-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PlaylistsComponent, PlaylistCarouselComponent]
})
export class PlaylistsModule { }
