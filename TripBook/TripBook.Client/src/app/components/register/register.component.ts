import { Router } from '@angular/router';
import { RegisterService } from './../../services/register.service';
import { REGISTER_URL } from './../../shared/constants';
import { Http, Headers } from '@angular/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SERVER_URL } from '../../shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: any[] = [];

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      validate: '',
    });
  }

  register(values) {
    console.log(values);
    this.registerService.register(values)
      .then(() => this.router.navigateByUrl('/login'))
      .catch(error => this.errors = error.json().errors);
  }




}
