import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TopArtists, Item } from '../../interfaces/artists';
import { AuthService } from '../../auth-service/auth-service/auth.service'

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  topArtists: TopArtists;

  private offset: number = 0;
  private timeRange: string = "medium_term"

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getTop();
  }

  getTop() {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/me/top/artists';
    let params = new HttpParams().set('offset', this.offset.toString());
    params = params.set('time_range', this.timeRange);

    this.http.get(url, { headers: header, params: params}).toPromise()
      .then(data => {
        this.offset += 20;
        const newArtists = data as TopArtists;

        if (this.topArtists == null) {
          this.topArtists = newArtists;
          return;
        }

        this.topArtists.items.push(...newArtists.items);     
      })
      .catch(error => console.log(error));
  }

  changeTimeRange(timeRange: string) {
    this.timeRange = timeRange;
    this.offset = 0;
    this.topArtists = null;
    this.getTop();
  }
}
