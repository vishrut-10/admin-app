import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http : HttpClient, private datePipe: DatePipe) { 
    this.fetchStudentDetails();
  }

  selectedItem = "On Boarding Form";
  url = "./assets/student-details.json";
  students$ : BehaviorSubject<Student[]> = new BehaviorSubject([]);
  enabledView : number = Action.Create;
  selectedStudent : number;

  getStudentDetails() {
    return this.http.get<Student[]>(this.url);
  }

  fetchStudentDetails() {
    this.http.get<Student[]>(this.url).subscribe(data => {
      this.students$.next(data);
    });
  }

  addNewStudent(student : Student) {
    const currentData = this.students$.getValue();
    const updatedData = [...currentData, student];
    this.students$.next(updatedData);
  }

  editStudentUtil(i) {
    this.selectedStudent = i;
    this.enabledView = Action.Edit;
  }

  editStudent() {

  }

  displayStudent(i) {
    this.selectedStudent = i;
    this.enabledView = Action.View;
  }
}

export interface Student {
  name : string;
  category : string;
  dob : Date;
  father : string;
  mother : string;
  last_class_score : string;
}

export enum Action {
  Create = 1,
  Edit = 2,
  View = 3
}
