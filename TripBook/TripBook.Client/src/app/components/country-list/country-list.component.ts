import { Router } from '@angular/router';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountryListComponent implements OnInit {

  countries: any[] = [];

  constructor(private tripService: TripBookService, private router: Router) { }

  ngOnInit() {
    this.tripService.loadCountries().then(response => {
      console.log(response);
      this.countries = response;
    }).catch(error => console.log(error));
  }

  show(id) {
    this.router.navigateByUrl('/countries/'+id);
  }

}
