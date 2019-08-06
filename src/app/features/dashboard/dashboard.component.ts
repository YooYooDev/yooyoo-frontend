import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'yoo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urole: string;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getuRole()
      .subscribe(
        res => this.urole = res
      );
  }

}
