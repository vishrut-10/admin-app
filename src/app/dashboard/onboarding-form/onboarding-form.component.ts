import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UtilService, Student } from 'src/services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit {

  constructor(public utilService : UtilService, public router: Router) { }

  ngOnInit() {
  }

  createView : boolean = true;
  editView : boolean = false;
  displayView : boolean = false;
  createViewMessage = "On Boarding Form";
  displayViewMessage = "On Boarding Form (View)";
  editViewMessage = "On Boarding Form (Edit)";
  documents = ["Domicile", "Birth certificate", "Marksheets", "Police clearance", "Passport", "Declaration"];
  student : Student;

  onSubmit(f: NgForm) {
    console.log(f.value);
    let formValue = f.value;
    
    this.student = {
      name: formValue.name,
      category : formValue.category,
      dob : formValue.dob,
      father : formValue.father,
      mother : formValue.mother,
      last_class_score : formValue.last_class_score
    }
    
    this.utilService.addNewStudent(this.student);
    this.utilService.selectedItem = "List Students";
    this.router.navigate(['/list']);
  }
}
