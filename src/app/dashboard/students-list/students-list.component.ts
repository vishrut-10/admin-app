import { Component, OnInit } from '@angular/core';
import { UtilService, Student } from 'src/services/util.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'] 
})
export class StudentsListComponent implements OnInit {

  constructor(public utilService : UtilService) {
    this.allStudents = this.utilService.students$.getValue();
    this.filteredStudents = this.allStudents;
  }

  ngOnInit() {
  }

  allStudents : Student[];
  filteredStudents : Student[];
  domesticStudents : Student[];
  internationalStudents : Student[];
  categories = ["All", "Domestic", "International"];
  selectedCategory : string;
  searchedStudent : string;

  get(category) {
    console.log(category.value);
    this.selectedCategory = category.value;

    if (this.selectedCategory === "Domestic") {
      this.filteredStudents = this.allStudents.filter(x => x.category === "Domestic");
      this.domesticStudents = this.filteredStudents;
    } else if (this.selectedCategory === "International") {
      this.filteredStudents = this.allStudents.filter(x => x.category === "International");
      this.internationalStudents = this.filteredStudents;
    } else {
      this.filteredStudents = this.allStudents;
    }
  }

  filterStudentsByName(value) {
    this.searchedStudent = value.toLowerCase();

    if (this.selectedCategory === "Domestic") {
      this.filteredStudents = this.domesticStudents.filter(x => x.name.toLowerCase().includes(this.searchedStudent));
    } else if (this.selectedCategory === "International") {
      this.filteredStudents = this.internationalStudents.filter(x => x.name.toLowerCase().includes(this.searchedStudent));
    } else {
      this.filteredStudents = this.allStudents.filter(x => x.name.toLowerCase().includes(this.searchedStudent));
    }

    if (this.searchedStudent.length === 0) {
      if (this.selectedCategory === "Domestic") {
        this.filteredStudents = this.domesticStudents;
      } else if (this.selectedCategory === "International") {
        this.filteredStudents = this.internationalStudents;
      } else {
        this.filteredStudents = this.allStudents;
      }
    }
  }

  deleteStudent(i) {
    this.utilService.students$.getValue().splice(i, 1);
  }
}
