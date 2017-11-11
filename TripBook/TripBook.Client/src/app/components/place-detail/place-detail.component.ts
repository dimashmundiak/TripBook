import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaceDetailComponent implements OnInit {

  place: any = new Object()

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    var cityId = this.activatedRoute.snapshot.paramMap.get('cityId');
    var placeId = this.activatedRoute.snapshot.paramMap.get('placeId');
    this.tripService.loadPlace(id, cityId, placeId).then(response => this.place = response).catch(error => console.log(error));
  }

}
