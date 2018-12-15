import { ToastService } from './../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'yoo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError = false;
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _toast: ToastService
  ) {}

  ngOnInit() {}

  onSubmit(f): void {
    // console.log(f.value);
    this._loginService.userAuth(f.value).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token); // pass api token name here
        this._router.navigate(['/dashboard']);
        this._toast.success('Logged in successfully!');
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }
}
