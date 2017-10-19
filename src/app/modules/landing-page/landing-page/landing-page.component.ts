import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    console.log(token);

    if (token) {
      console.log('Already logged in');
      //return;
    }

    this.activatedRoute.fragment.subscribe((fragment: string) => {
        console.log('Checking callback params');
        let accessToken = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
        let state = fragment.match(/^(.*?)&/)[1].replace('state=', '');

        console.log(state);

        if (accessToken != null) {
          console.log('Storing token');
          localStorage.setItem('access_token', accessToken);
        } else {
          console.log('Logging in');
          this.login();
        }
      });
  }

  private login() {
    const clientId = 'a4984ffdc4f140d39634d0e071664ffe';
    const redirectUri = 'http:%2F%2Flocalhost:4200%2f';
    const scope = 'user-read-private%20user-read-email';
    const responseType = 'token';
    const state = 'plotifylogin';

    this.document.location.href = 
      `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;
  }

}
