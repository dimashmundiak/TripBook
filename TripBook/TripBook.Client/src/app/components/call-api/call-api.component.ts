import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.scss']
})
export class CallApiComponent implements OnInit {
  response: string;
  constructor(private http: Http, private authService: AuthService) { }

  ngOnInit() {
    let header = new Headers({ 'Authorization': this.authService.getAuthorizationHeaderValue() });
    let options = new RequestOptions({ headers: header });

    this.http.get("https://localhost:44360/api/countries", options)
      .subscribe(response => this.response = response.text());
  }
}