import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CityDetailComponent implements OnInit {

  countryId: number = 0;
  city: any = new Object();

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    var cityId = this.activatedRoute.snapshot.paramMap.get('cityId');
    this.countryId = +cityId;
    this.tripService.loadCity(id, cityId).then(response => this.city = response).catch(error => console.log(error));
  }

}
