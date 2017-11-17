import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../landing-page/landing-page/landing-page.component'
import { TopArtistsComponent } from '../top-artists/top-artists/top-artists.component'
import { PlaylistsComponent } from '../playlists/playlists/playlists.component';
import { CurrentlyPlayingComponent } from '../currently-playing/currently-playing/currently-playing.component';

const appRoutes = [
  { path: '', component: LandingPageComponent },
  { path: 'top-artists', component: TopArtistsComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'currently-playing', component: CurrentlyPlayingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
