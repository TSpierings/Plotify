import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { TopArtistsComponent } from './top-artists/top-artists.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component'
import { AuthServiceModule } from '../auth-service/auth-service.module'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthServiceModule
  ],
  exports: [
    TopArtistsComponent
  ],
  declarations: [ArtistListComponent, TopArtistsComponent, HeaderComponent]
})
export class TopArtistsModule { }
