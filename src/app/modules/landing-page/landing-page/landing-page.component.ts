import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TopArtists, Item } from '../../interfaces/artists';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  topArtists: TopArtists = null;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {    
    this.activatedRoute.fragment.subscribe((fragment: string) => {
      console.log('Checking callback params');
      
      if (fragment != null) {
        let accessToken = fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
        let state = fragment.match(/^(.*?)&/)[1].replace('state=', '');

        console.log(state);

        if (accessToken != null) {
          console.log('Storing token');
          localStorage.setItem('access_token', accessToken);
        } 
      }
    });

    const token = localStorage.getItem('access_token');
    console.log(token);

    if (token) {
      console.log('Already logged in');
      this.router.navigate(['/']);
      this.getTop();
    } else {
      console.log('Logging in');
      this.login();
    }
  }

  private login() {
    const clientId = 'a4984ffdc4f140d39634d0e071664ffe';
    const redirectUri = 'http://localhost:4200/';
    const scope = 'user-read-private user-read-email user-top-read';
    const responseType = 'token';
    const state = 'plotifylogin';

    this.document.location.href = 
      `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;
  }

  private getTop() {
    const token = localStorage.getItem('access_token');
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/me/top/artists';
    this.http.get(url, { headers: header}).toPromise()
      .then(data => {
        console.log(data);
        this.topArtists = data as TopArtists;
      })
      .catch(error => console.log(error));
  }
}
