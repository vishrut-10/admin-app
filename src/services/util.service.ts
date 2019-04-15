import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http : HttpClient) { 
    this.fetchStudentDetails();
  }

  selectedItem = "On Boarding Form";
  url = "./assets/student-details.json";
  students$ : BehaviorSubject<Student[]> = new BehaviorSubject([]);

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
}

export interface Student {
  name : string;
  category : string;
  dob : Date;
  father : string;
  mother : string;
  last_class_score : string;
}
