import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopArtists, ArtistItem } from '../../interfaces/artists';
import { AuthService } from '../../auth-service/auth-service/auth.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  topArtists: TopArtists = null;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.readFragments();

    const token = this.authService.getToken();

    if (token) {
      this.router.navigate(['/top-artists']);
      return;
    }

    this.authService.login();
  }

  private readFragments() {
    this.activatedRoute.fragment.subscribe((fragment: string) => {

      if (fragment != null) {
        const accessToken = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
        const expiresIn = Number.parseInt(fragment.match(/expires_in=([0-9]*)/)[1]) * 1000 + new Date().getTime();
        const state = fragment.match(/state=(.*)/)[1];

        if (accessToken == null || expiresIn == null || state == null) {
          console.log('Fragmet does not contain tokens!');
          return;
        }

        if (localStorage.getItem('state') !== state) {
          console.log('Wrong state identifer!');
          return;
        }

        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('expires_in', expiresIn.toString());
      }
    });
  }
}
