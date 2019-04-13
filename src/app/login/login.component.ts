import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public utilService: UtilService) { }

  ngOnInit() {
  }

  title = "Login School Admin";
  errorMessage = "*Invalid Username or Password.";
  userName : string;
  password : string;
  isInvalidCredentials : boolean = false;

  login() {
    if (this.userName === "admin" && this.password === "admin") {
      this.isInvalidCredentials = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.isInvalidCredentials = true;
    }

    this.userName = "";
    this.password = "";
  }

  reset() {
    this.userName = "";
    this.password = "";
    this.isInvalidCredentials = false;
  }
}
