import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router, public utilService: UtilService) { }

  ngOnInit() {
    this.selectedItem = this.utilService.selectedItem;
  }

  groups = ["On Boarding Form", "List Students"];
  selectedItem;

  listClick(newValue) {
    console.log(newValue);
    this.selectedItem = newValue;

    if (this.selectedItem === this.groups[0]) {
      this.utilService.selectedItem = this.groups[0];
      this.router.navigate(['/form']);
    } else if (this.selectedItem === this.groups[1]) {
      this.utilService.selectedItem = this.groups[1];
      this.router.navigate(["/list"]);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
