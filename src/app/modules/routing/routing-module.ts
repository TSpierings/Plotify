import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../landing-page/landing-page/landing-page.component'
import { TopArtistsComponent } from '../top-artists/top-artists/top-artists.component'

const appRoutes = [
  { path: '', component: LandingPageComponent },
  { path: 'top-artists', component: TopArtistsComponent }
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
