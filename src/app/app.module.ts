import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './modules/routing/routing-module'
import { LandingPageModule } from './modules/landing-page/landing-page.module'
import { HeaderModule } from './modules/header/header.module'
import { TopArtistsModule } from './modules/top-artists/top-artists.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { CurrentlyPlayingModule } from './modules/currently-playing/currently-playing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingPageModule,
    HeaderModule,
    TopArtistsModule,
    BrowserAnimationsModule,
    PlaylistsModule,
    CurrentlyPlayingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
