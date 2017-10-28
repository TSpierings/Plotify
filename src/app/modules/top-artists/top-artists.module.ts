import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TopArtistsComponent
  ],
  declarations: [ArtistListComponent, TopArtistsComponent]
})
export class TopArtistsModule { }
