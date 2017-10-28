import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TopArtists, Item } from '../../interfaces/artists';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  topArtists: TopArtists;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTop();
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
