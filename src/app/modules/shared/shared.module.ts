import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './artist-card/artist-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ArtistCardComponent
  ],
  declarations: [ArtistCardComponent]
})
export class SharedModule { }
