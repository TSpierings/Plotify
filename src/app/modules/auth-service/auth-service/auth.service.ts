import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {

  constructor() { }

  login() {
    const clientId = environment.clientID;
    const redirectUri = environment.callbackURL;
    const scope =
    'user-read-private user-read-email user-top-read playlist-read-private user-read-currently-playing user-read-recently-played';
    const responseType = 'token';

    const state = uuid();
    localStorage.setItem('state', state);

    const authorizeApi = 'https://accounts.spotify.com/authorize';
    document.location.href =
      `${authorizeApi}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&state=${state}`;
  }

  getToken(): string {
    const accessToken = localStorage.getItem('access_token');
    const expiresIn = localStorage.getItem('expires_in');

    if (accessToken == null || expiresIn == null) {
      console.log('No token stored!');
      this.login();
    }

    if (new Date().getTime() > Number.parseInt(expiresIn)) {
      console.log('Token expired!');
      this.login();
    }

    return accessToken;
  }
}
