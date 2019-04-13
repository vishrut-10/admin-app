import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http : HttpClient) { }

  selectedItem = "On Boarding Form";
  url = "./assets/student-details.json";

  getStudentDetails() {
    return this.http.get<Student[]>(this.url);
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
