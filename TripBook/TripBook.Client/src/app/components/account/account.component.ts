import { AuthService } from './../../services/auth.service';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  favourite: any[] = [];

  constructor(
    private tripService: TripBookService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.tripService.loadUser(this.authService.getUser().profile.sub).then(response => this.favourite = response.places).catch(error => console.log(error));
  }

}
