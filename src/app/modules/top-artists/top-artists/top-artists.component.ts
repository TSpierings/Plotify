import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TopArtists, Item } from '../../interfaces/artists';
import { AuthService } from '../../auth-service/auth-service/auth.service'
import { MapItem } from '../../shared/bar-chart/bar-chart.component';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  topArtists: TopArtists;
  weightedGenres: Array<MapItem>;

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
          this.generateGenreList();
          return;
        }

        this.topArtists.items.push(...newArtists.items);
        this.generateGenreList();        
      })
      .catch(error => console.log(error));
  }

  changeTimeRange(timeRange: string) {
    this.timeRange = timeRange;
    this.offset = 0;
    this.topArtists = null;
    this.getTop();
  }

  generateGenreList() {
    let genres = new Array<MapItem>();
    let index = 0;

    this.topArtists.items.forEach(element => {
      element.genres.forEach(genre => {
        const item = genres.find(x => x.key === genre);

        if (item) {
          item.value += (20 + this.offset - index);
        }

        genres.push({key: genre, value: 20 - index, normalizedValue: 0});
      });
      index++;
    });

    const maxValue = genres.reduce((a, c) => {return c.value > a ? c.value : a}, 0);

    genres.forEach(genre => {
      genre.normalizedValue = genre.value / maxValue;
    });

    genres = genres.sort((a, b) => b.normalizedValue - a.normalizedValue);

    this.weightedGenres = genres;
  }
}
