import { AuthService } from './../../services/auth.service';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  favourite: boolean;
  editForm: FormGroup;
  admin: boolean;

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      validate: '',
    });
    this.editForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      rating: [null, Validators.required],
      validate: '',
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cityId = this.activatedRoute.snapshot.paramMap.get('cityId');
    this.placeId = this.activatedRoute.snapshot.paramMap.get('placeId');
    this.loadPlace();
    if (this.authService.isLoggedIn()) {
      this.admin = this.authService.isAdmin();
      this.isFavourite();
    }
  }

  addComment(values) {
    var name = this.authService.getUser().profile.name;
    var content = "hello world";
    this.tripService.addComment(this.id, this.cityId, this.placeId, values.content, name).then(() => this.loadPlace()).catch(error => console.log(error));
  }

  loadPlace() {
    this.tripService.loadPlace(this.id, this.cityId, this.placeId).then(response => this.place = response).catch(error => console.log(error));
  }

  deletePlace() {
    this.tripService.deletePlace(this.id, this.cityId, this.placeId).then(() => this.router.navigateByUrl('/country/' + this.id + '/city/' + this.cityId)).catch(error => console.log(error));
  }

  editPlace(values) {
    this.tripService.editPlace(values, this.id, this.cityId, this.placeId).then(() => this.loadPlace()).catch(error => console.log(error));
  }

  isFavourite() {
    this.tripService.isFavorite(this.authService.getUser().profile.sub, this.placeId).then(response => this.favourite = response.result).catch(error => console.log(error));
  }

  addToFavourite() {
    this.tripService.addToFavourite(this.id, this.cityId, this.placeId, this.authService.getUser().profile.sub).then(() => this.isFavourite()).catch(error => console.log(error));
  }

}
