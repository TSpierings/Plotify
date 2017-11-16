import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { SwitchComponent } from './switch/switch.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FeatureImageComponent } from './feature-image/feature-image.component';
import { ImageSizePipe } from './pipes/image-size-pipe'
import { PitchClassPipe } from './pipes/pitch-class-pipe'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ArtistCardComponent,
    SwitchComponent,
    BarChartComponent,
    FeatureImageComponent,
    ImageSizePipe,
    PitchClassPipe
  ],
  declarations: [
    ArtistCardComponent,
    SwitchComponent,
    BarChartComponent,
    FeatureImageComponent,
    ImageSizePipe,
    PitchClassPipe
  ]
})
export class SharedModule { }
