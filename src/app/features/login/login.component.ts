import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'yoo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _router: Router, private _user: LoginService) {}

  ngOnInit() {}

  loginUser(e) {
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;

    console.log(username, password);

    if (username == 'admin' && password == 'admin') {
      this._user.setUserLoggedIn();
      this._router.navigate(['dashboard']);
    }
  }
}
