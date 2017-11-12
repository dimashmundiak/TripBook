import { CITY_URL, PLACE_URL } from './../shared/constants';
import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { SERVER_URL, COUNTRIES_URL } from '../shared/constants';

@Injectable()
export class TripBookService {

  constructor(private http: Http, private authService: AuthService) { }

  loadCountries() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.get(SERVER_URL + COUNTRIES_URL, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  loadCountry(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.get(SERVER_URL + COUNTRIES_URL + '/' + id, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  loadCity(id, cityId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.get(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  loadPlace(id, cityId, placeId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.get(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId + PLACE_URL + '/' + placeId, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  addComment(id, cityId, placeId, content, name) {
    let body = JSON.stringify({
      placeId: placeId,
      content: content,
      author: name
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.post(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId + PLACE_URL + '/' + placeId + '/comment', body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
