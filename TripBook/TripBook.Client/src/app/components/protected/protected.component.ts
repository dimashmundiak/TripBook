import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProtectedComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.getUser());
  }

}
