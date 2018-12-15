import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'yoo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router, private _toast: ToastService) {}

  ngOnInit() {}

  logOut(): void {
    // console.log('Logged out');
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
    this._toast.success('Logged out successfully!');
  }
}
