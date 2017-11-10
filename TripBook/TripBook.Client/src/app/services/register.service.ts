import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { SERVER_URL, REGISTER_URL } from '../shared/constants';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(values) {

    let body = JSON.stringify({
      username: values.username,
      password: values.password,
      email: values.email
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this.http.post(SERVER_URL + REGISTER_URL, body, { headers: headers }).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
