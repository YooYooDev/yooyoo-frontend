import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  private IsUserLoggedIn;
  private username;

  constructor() {
    this.IsUserLoggedIn = false;
  }

  setUserLoggedIn() {
    this.IsUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.IsUserLoggedIn;
  }
}
