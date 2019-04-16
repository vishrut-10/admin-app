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
    } else {
      this.editView = false;
      this.createView = true;
      this.displayView = false;
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
  documents : string[];
  domesticDocuments = ["Domicile*", "Birth_Certificate*", "Marksheets*", "Police_Clearance ", "Passport*", "Declaration*"];
  internationalDocuments = ["Domicile*", "Birth_Certificate*", "Marksheets*", "Police_Clearance*", "Passport*", "Declaration*"];
  student : Student;
  documentValues : boolean[] = [];
  
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
      father : formValue.father_name,
      mother : formValue.mother_name,
      last_class_score : formValue.score,
      documents : {
        domicile : Boolean(formValue.Domicile),
        marksheet : Boolean(formValue.Marksheets),
        passport : Boolean(formValue.Passport),
        policeClearance : Boolean(formValue.Police_Clearance),
        declaration : Boolean(formValue.Declaration),
        birthCertificate : Boolean(formValue.Birth_Certificate)
      }
    }

    console.log(this.student);
    
    this.utilService.addNewStudent(this.student);
    this.utilService.selectedItem = "List Students";
    this.router.navigate(['/list']);
  }

  onEdit(f: NgForm) {
    let formValue = f.value;
    
    this.student = {
      name: formValue.name,
      category : formValue.category,
      dob : formValue.dob,
      father : formValue.father_name,
      mother : formValue.mother_name,
      last_class_score : formValue.last_class_score,
      documents : {
        domicile : Boolean(formValue.Domicile),
        marksheet : Boolean(formValue.Marksheets),
        passport : Boolean(formValue.Passport),
        policeClearance : Boolean(formValue.Police_Clearance),
        declaration : Boolean(formValue.Declaration),
        birthCertificate : Boolean(formValue.Birth_Certificate)
      }
    }
    this.utilService.editStudent(this.student, this.utilService.selectedStudent);
    this.utilService.selectedItem = "List Students";
    this.router.navigate(['/list']);
  }

  populateStudentView() {
    this.student = this.utilService.students$.getValue()[this.utilService.selectedStudent];
    console.log(this.student);
    this.stud_name = this.student.name;
    this.stud_category = this.student.category;
    this.stud_dob = this.student.dob;
    this.stud_father = this.student.father;
    this.stud_mother = this.student.mother;
    this.stud_score = this.student.last_class_score;
    this.documents = (this.stud_category === "Domestic") ? this.domesticDocuments : this.internationalDocuments;
    this.documentValues.push(this.student.documents.domicile);
    this.documentValues.push(this.student.documents.birthCertificate);
    this.documentValues.push(this.student.documents.marksheet);
    this.documentValues.push(this.student.documents.policeClearance);
    this.documentValues.push(this.student.documents.passport);
    this.documentValues.push(this.student.documents.declaration);
    console.log(this.documentValues); 
  }

  get(category) {
    console.log(category.value);
    if (category.value === "Domestic") {
      this.documents = this.domesticDocuments;
    } else {
      this.documents = this.internationalDocuments;
    }
  }

  back() {
    this.utilService.enabledView = Action.Create;
    this.utilService.selectedItem = "List Students";
    this.router.navigate(['/list']);
  }
}
