import { ToastService } from './../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'yoo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myRecaptcha: boolean;
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _toast: ToastService
  ) { }

  ngOnInit() {}
  onScriptLoad(): void {
    console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError(): void {
    console.log('Something went long when loading the Google reCAPTCHA')
  }
  onSubmit(f): void {
    // console.log(f.value);
    this._loginService.userAuth(f.value).subscribe(
      (data: any) => {
        localStorage.setItem('urole', data.role);
        localStorage.setItem('token', data.accessToken); // pass api access token parameter name here
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo)); // store user info object here
        this._router.navigate(['/dashboard']);
        this._toast.success('Logged in successfully!');
      },
      (err: HttpErrorResponse) => {
        this._toast.error('Incorrect Email ID or Password');
      }
    );
  }
}
