import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UtilService, Student, Action } from 'src/services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit {

  constructor(public utilService : UtilService, public router: Router) {
    if (this.utilService.enabledView === Action.Edit) {
      this.editView = true;
      this.createView = false;
      this.displayView = false;
      this.populateStudentView();
    } else if (this.utilService.enabledView === Action.View) {
      this.editView = false;
      this.createView = false;
      this.displayView = true;
      this.populateStudentView();
    }
   }

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
  
  stud_name : string;
  stud_dob : Date;
  stud_father : string;
  stud_mother : string;
  stud_score : string;
  stud_category : string;

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

  onEdit(f: NgForm) {
    console.log(f.value);
  }

  populateStudentView() {
    this.student = this.utilService.students$.getValue()[this.utilService.selectedStudent];
    this.stud_name = this.student.name;
    this.stud_category = this.student.category;
    this.stud_dob = this.student.dob;
    this.stud_father = this.student.father;
    this.stud_mother = this.student.mother;
    this.stud_score = this.student.last_class_score;
  }
}
