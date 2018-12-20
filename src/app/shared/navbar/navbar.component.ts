import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'yoo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  urole: string;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    // subscribing user role from auth service
    this._authService.urole.subscribe(
      res => this.urole = res
    );
  }
}
