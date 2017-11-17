import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentlyPlayingComponent } from './currently-playing/currently-playing.component';
import { SharedModule } from '../shared/shared.module';
import { PlayHistoryComponent } from './play-history/play-history.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CurrentlyPlayingComponent,
    PlayHistoryComponent
  ],
  exports: [
    CurrentlyPlayingComponent
  ]
})
export class CurrentlyPlayingModule { }
