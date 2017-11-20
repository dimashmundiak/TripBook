import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable()
export class AuthService {
  private manager: UserManager = new UserManager(getClientSettingsLocal());
  private user: User = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getUser() {
    return this.user;
  }

  isAdmin() {
    if (this.isLoggedIn())
      return this.user.profile.role === 'admin';
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }

  refreshToken() {
    console.log('test1');
    return this.manager.signinSilentCallback().then(user => {
      this.user = user;
    }).catch(error => console.log(error));
  }

  logOut() {
    return this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://localhost:44360/',
    client_id: 'angular_spa',
    redirect_uri: 'https://localhost:44363/auth-callback',
    post_logout_redirect_uri: 'https://localhost:44363/',
    response_type: "id_token token",
    scope: "openid profile api1 role",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'https://localhost:44363/silent-refresh'
  };
}

export function getClientSettingsLocal(): UserManagerSettings {
  return {
    authority: 'https://localhost:44360/',
    client_id: 'angular_spa_local',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "id_token token",
    scope: "openid profile api1 role",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
  };
}