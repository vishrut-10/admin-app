import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createView : boolean = true;
  editView : boolean = false;
  displayView : boolean = false;
  createViewMessage = "On Boarding Form";
  displayViewMessage = "On Boarding Form (View)";
  editViewMessage = "On Boarding Form (Edit)";
}
