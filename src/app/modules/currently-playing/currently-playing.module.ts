import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentlyPlayingComponent } from './currently-playing/currently-playing.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CurrentlyPlayingComponent
  ],
  exports: [
    CurrentlyPlayingComponent
  ]
})
export class CurrentlyPlayingModule { }
