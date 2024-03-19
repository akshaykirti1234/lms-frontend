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

  // for pagination
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private service: AssessmentService, private router: Router) { }

  ngOnInit() {
    this.getAssessmentList();
  }
  getAssessmentList() {
    this.service.viewAssessment().subscribe(response => {
      this.assessmentList = response;
      console.log(this.assessmentList);
    })
  }

  // delete(id:any){
  //   this.service.deleteAssessment(id).subscribe(response=>{
  //     console.log(response);
  //     this.ngOnInit();
  //   })
  // }
  public delete(id: any): void {
    Swal.fire({
      title: 'Are you sure ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteAssessment(id).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted Successfully',
            });
            this.getAssessmentList();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Something Went Wrong!',
            });
          },
        });
      }
    });
  }

  edit(id: any) {
    this.router.navigate(["/admin/assessment/editAssessment/" + id]);

  }



  //pagination functionality
  getTableDataChange(event: any) {

    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAssessmentList();
  }


}
