import { AuthService } from './../../services/auth.service';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CityDetailComponent implements OnInit {

  city: any = new Object();
  id: string;
  cityId: string;
  editForm: FormGroup;
  addForm: FormGroup;
  admin: boolean;

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cityId = this.activatedRoute.snapshot.paramMap.get('cityId');
    this.editForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      rating: [null, Validators.required],
      validate: '',
    });
    this.addForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      rating: [null, Validators.required],
      validate: '',
    });
    if(this.authService.isLoggedIn()) this.admin = this.authService.isAdmin();
    this.loadCity();
  }

  loadCity() {
    this.tripService.loadCity(this.id, this.cityId).then(response => this.city = response).catch(error => console.log(error));
  }

  editCity(values) {
    this.tripService.editCity(values, this.id, this.cityId).then(() => this.loadCity()).catch(error => console.log(error));
  }

  deleteCity() {
    this.tripService.deleteCity(this.id, this.cityId).then(() => this.router.navigateByUrl('/country/' + this.id)).catch(error => console.log(error));
  }

  addPlace(values) {
    this.tripService.addPlace(values, this.id, this.cityId).then(() => this.loadCity()).catch(error => console.log(error));
  }

}
