import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yoo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  logOut(): void {
    // console.log('Logged out');
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
