import { FilterPipe } from './shared/filter.pipe';
import { RegisterService } from './services/register.service';
import { TripBookService } from './services/trip-book.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CallApiComponent } from './components/call-api/call-api.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { RegisterComponent } from './components/register/register.component';
import { RatingComponent } from './components/rating/rating.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { AccountComponent } from './components/account/account.component';
import { SilentRefreshComponent } from './components/silent-refresh/silent-refresh.component';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    WelcomeComponent,
    NavbarComponent,
    CallApiComponent,
    LoginComponent,
    LogoutComponent,
    CountryListComponent,
    RegisterComponent,
    FilterPipe,
    RatingComponent,
    CountryDetailComponent,
    CityDetailComponent,
    PlaceDetailComponent,
    AccountComponent,
    SilentRefreshComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgProgressModule
  ],
  providers: [AuthGuardService, AuthService, TripBookService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
