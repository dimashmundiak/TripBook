import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable()
export class AuthService {
  private manager: UserManager = new UserManager(getClientSettings());
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
    loadUserInfo: true
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
    loadUserInfo: true
  };
}