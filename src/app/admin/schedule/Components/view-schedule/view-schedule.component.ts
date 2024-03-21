import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../Services/schedule.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  public scheduleList: any;
  public searchFilter: any;


  constructor(private scheduleService: ScheduleService, private router: Router) { }

  ngOnInit(): void {
    this.getAllScheduleForm();
  }

  // for pagination
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  //pagination functionality
  getTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAllScheduleForm();
  }



  public getAllScheduleForm(): void {
    this.scheduleService.getAllScheduleForm().subscribe({
      next: (response) => {
        this.scheduleList = response.body;
        console.log(this.scheduleList);
      },
      error: (error) => {
        console.log("Unable to get Schedule List");
      }
    });
  }

  public editSchedule(scheduleForId: any): void {
    this.router.navigate(['/admin/schedule/editSchedule/', scheduleForId]);
  }

  public deleteSchedule(scheduleForId: any): void {
    Swal.fire({
      title: 'Are you sure ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.scheduleService.deleteScheduleFor(scheduleForId).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted Successfully',
            });
            this.getAllScheduleForm();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Something Went Wrong!',
            });
          }
        });
      }
    });
  }
}
