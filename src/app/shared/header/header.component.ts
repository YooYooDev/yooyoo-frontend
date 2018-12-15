import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'yoo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router, private _toast: ToastService, private _removeToken: UtilService) {}

  ngOnInit() {}

  logOut(): void {
    this._removeToken.removeToken();
    this._router.navigate(['/logout']);
    this._toast.success('Logged out successfully!');
  }
}
