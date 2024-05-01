import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from '../../Services/assessment.service';

@Component({
  selector: 'app-view-assessment',
  templateUrl: './view-assessment.component.html',
  styleUrls: ['./view-assessment.component.css']
})
export class ViewAssessmentComponent {

  assessmentList: any;
  sessionList:any;
  selectedType: string = 'schedule'; // Default to 'Schedule for'

  // for pagination
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private service: AssessmentService, private router: Router) { }

  ngOnInit() {
    this.selectedType = 'schedule';
    this.getAssessmentList();
  }

  getAssessmentList() {
    // Fetch assessment list based on the selected type
    if (this.selectedType === 'schedule') {
      // Fetch schedule assessment list
      this.service.viewAssessment().subscribe(response => {
        this.assessmentList = response;
      });
    } else {
      // Fetch session assessment list
      this.service.viewSessionAssessment().subscribe(response => {
      
        this.assessmentList = response;
        console.log(this.sessionList);
        
      });
    }
  }



  


  delete(id: any): void {
    const confirmationText = `Are you sure you want to delete this ${this.selectedType} assessment?`;
    Swal.fire({
      title: confirmationText,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete assessment based on the selected type
        if (this.selectedType === 'schedule') {
          this.service.deleteAssessment(id).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted Successfully',
              });
              this.getAssessmentList(); // Reload the assessment list after deletion
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong!',
              });
            },
          });
        } else {
          this.service.deleteAssSession(id).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted Successfully',
              });
              this.getAssessmentList(); // Reload the assessment list after deletion
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Something Went Wrong!',
              });
            },
          });
        }
      }
    });
  }


  // edit(id: any,selectType: string) {
  //   this.router.navigate(["/admin/assessment/editAssessment/" + id]);
  // }

  edit(id: any, selectType: string) {
    this.router.navigate(["/admin/assessment/editAssessment/" + id], { queryParams: { selectType: selectType } });
  }
  

  //pagination functionality
  getTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAssessmentList();
  }

  // Method to toggle between 'Schedule for' and 'Session for' tables
  toggleTable(type: string) {
    this.selectedType = type;
    // Fetch assessment list based on the selected type
    this.getAssessmentList();
  }
}