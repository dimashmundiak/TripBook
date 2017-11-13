import { CITY_URL, PLACE_URL, USER_URL } from './../shared/constants';
import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { SERVER_URL, COUNTRIES_URL } from '../shared/constants';

@Injectable()
export class TripBookService {

  constructor(private http: Http, private authService: AuthService) { }


  //Countries methods
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

  addCountry(values) {
    let body = JSON.stringify({
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      rating: values.rating
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.post(SERVER_URL + COUNTRIES_URL, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteCountry(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.delete(SERVER_URL + COUNTRIES_URL + '/' + id, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  editCountry(values, id) {
    let body = JSON.stringify({
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      rating: values.rating
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.put(SERVER_URL + COUNTRIES_URL + '/' + id, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //City methods
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

  addCity(values, id) {
    let body = JSON.stringify({
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      rating: values.rating
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.post(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteCity(id, cityId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.delete(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  editCity(values, id, cityId) {
    let body = JSON.stringify({
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      rating: values.rating
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.put(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //Place methods
  addPlace(values, id, cityId) {
    let body = JSON.stringify({
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      rating: values.rating
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.post(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId + PLACE_URL, body, { headers: headers }).toPromise()
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

  deletePlace(id, cityId, placeId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.delete(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId + PLACE_URL + '/' + placeId, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  editPlace(values, id, cityId, placeId) {
    let body = JSON.stringify({
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      rating: values.rating
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.put(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId + PLACE_URL + '/' + placeId, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  addComment(id, cityId, placeId, values, name) {
    let body = JSON.stringify({
      placeId: placeId,
      content: values.content,
      rating: +values.rating,
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

  isFavorite(id, placeId) {
    let body = JSON.stringify({
      id: placeId
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.post(SERVER_URL + USER_URL + '/' + id, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  addToFavourite(id, cityId, placeId, userId) {
    let body = JSON.stringify({
      id: userId
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.post(SERVER_URL + COUNTRIES_URL + '/' + id + CITY_URL + '/' + cityId + PLACE_URL + '/' + placeId + '/favourite', body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //User methods
  loadUser(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', this.authService.getAuthorizationHeaderValue());
    }

    return this.http.get(SERVER_URL + USER_URL + '/' + id, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
