import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { CallApiComponent } from './components/call-api/call-api.component';
import { LoginComponent } from './components/login/login.component';
import { CityDetailComponent } from './components/city-detail/city-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'country/:id', component: CountryDetailComponent },
  { path: 'country/:id/city/:cityId', component: CityDetailComponent },
  { path: 'country/:id/city/:cityId/place/:placeId', component: PlaceDetailComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
