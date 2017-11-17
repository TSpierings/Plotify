import { Injectable, Inject, } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {

  constructor(@Inject(DOCUMENT) private document: any) { }

  login() {
    const clientId = environment.clientID;
    const redirectUri = environment.callbackURL;
    const scope = 'user-read-private user-read-email user-top-read playlist-read-private';
    const responseType = 'token';

    const state = uuid();
    localStorage.setItem('state', state);

    const authorizeApi = 'https://accounts.spotify.com/authorize';
    this.document.location.href =
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
