import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { TripBookService } from './../../services/trip-book.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountryListComponent implements OnInit {

  countries: any[] = [];
  admin: boolean;
  addForm: FormGroup;

  constructor(
    private tripService: TripBookService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      rating: [null, Validators.required],
      validate: '',
    });
    if (this.authService.isLoggedIn()) this.admin = this.authService.isAdmin();
    this.load();
  }

  addCountry(values) {
    this.tripService.addCountry(values).then(() => this.load()).catch(error => console.log(error));
  }

  load() {
    this.tripService.loadCountries().then(response => {
      console.log(response);
      this.countries = response;
    }).catch(error => console.log(error));
  }

}
