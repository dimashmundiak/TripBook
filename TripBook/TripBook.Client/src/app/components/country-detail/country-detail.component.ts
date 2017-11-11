import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountryDetailComponent implements OnInit {

  country: any = new Object;

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tripService.loadCountry(id).then(response => this.country = response).catch(error => console.log(error));
  }

}
