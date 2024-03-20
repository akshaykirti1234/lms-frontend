import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { LocationService } from '../../Services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.css'],
})
export class ViewLocationComponent {
  locationList: any;

  constructor(
    private service: LocationService,
    private router: Router
  ) { }

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
    this.getLocationList();
  }


  ngOnInit(): void {
    this.getLocationList();
  }
  // edit(id:any){

  //   this.router.navigate(["/dashboard/edit/"+id]);
  // }

  getLocationList() {
    this.service.viewLocationDetails().subscribe((responseData: any) => {
      this.locationList = responseData;

      console.log(this.locationList);
    });
  }

  deleteLocation(id: any) {
    Swal.fire({
      title: 'Confirmation',

      text: 'Are you sure you want to delete this record?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it',

      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with the delete operation

        this.service.deleteLocation(id).subscribe(
          (data: any) => {
            // Show success message with SweetAlert

            Swal.fire({
              title: 'Record Deleted Successfully!',

              text: data.message,

              icon: 'success',

              confirmButtonText: 'OK',
            }).then(() => {
              this.getLocationList();
            });
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',

              text: 'Failed to delete the record. Please try again later.',

              icon: 'error',

              confirmButtonText: 'OK',
            });
          }
        );
      }
    });
  }

  editLoc(id: any) {
    this.router.navigate(['/admin/location/editLocation/' + id]);
  }
}
