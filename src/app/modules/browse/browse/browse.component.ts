import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth-service/auth-service/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchRootObject } from 'app/modules/interfaces/search';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  search(value: string) {
    // value = value.replace(' ', '%20');

    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/search';
    const params = new HttpParams()
      .set('q', value)
      .set('type', 'artist,album,track')
      .set('limit', '5');

    this.http.get(url, { headers: header, params: params}).toPromise()
      .then(data => {
        const searchData = data as SearchRootObject;
        console.log(searchData);
      })
      .catch(error => console.log(error));
  }

}
