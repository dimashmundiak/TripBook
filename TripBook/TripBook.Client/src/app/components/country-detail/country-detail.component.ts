import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountryDetailComponent implements OnInit {

  id: string;
  country: any = new Object;
  admin: boolean;
  editForm: FormGroup;
  addForm: FormGroup;

  constructor(
    private tripService: TripBookService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.authService.isLoggedIn()) this.admin = this.authService.isAdmin();
    this.loadCountry();
  }

  deleteCountry() {
    this.tripService.deleteCountry(this.id).then(() => this.router.navigateByUrl('/countries')).catch(error => console.log(error));
  }

  editCountry(values) {
    this.tripService.editCountry(values, this.id).then(() => this.loadCountry()).catch(error => console.log(error));
    this.editForm.reset();
  }

  loadCountry() {
    this.tripService.loadCountry(this.id).then(response => this.country = response).catch(error => console.log(error));
  }

  addCity(values) {
    this.tripService.addCity(values, this.id).then(() => this.loadCountry()).catch(error => console.log(error));
  }
}
