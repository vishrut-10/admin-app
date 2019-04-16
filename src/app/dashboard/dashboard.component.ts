import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router) {
    if (localStorage.length === 1) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
  }

}
