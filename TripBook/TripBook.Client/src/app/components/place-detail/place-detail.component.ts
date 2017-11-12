import { AuthService } from './../../services/auth.service';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaceDetailComponent implements OnInit {

  place: any = new Object();
  commentForm: FormGroup;
  id: string;
  cityId: string;
  placeId: string;

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      validate: '',
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cityId = this.activatedRoute.snapshot.paramMap.get('cityId');
    this.placeId = this.activatedRoute.snapshot.paramMap.get('placeId');
    this.load();
  }

  addComment(values) {
    var name = this.authService.getUser().profile.name;
    var content = "hello world";
    this.tripService.addComment(this.id, this.cityId, this.placeId, values.content, name).then(() => this.load()).catch(error => console.log(error));
  }

  load() {
    this.tripService.loadPlace(this.id, this.cityId, this.placeId).then(response => this.place = response).catch(error => console.log(error));
  }

}
