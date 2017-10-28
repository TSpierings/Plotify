import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ArtistCardComponent,
    SwitchComponent
  ],
  declarations: [ArtistCardComponent, SwitchComponent]
})
export class SharedModule { }
