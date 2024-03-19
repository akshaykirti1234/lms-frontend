import { Component, OnInit } from '@angular/core';
import { SubModuleService } from '../../Services/sub-module.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-sub-module',
  templateUrl: './view-sub-module.component.html',
  styleUrls: ['./view-sub-module.component.css'],
})
export class ViewSubModuleComponent implements OnInit {
  inductionList: any;

  constructor(private service: SubModuleService, private router: Router) { }

  ngOnInit(): void {
    this.getSubModuleList();
  }

  edit(id: any) {
    this.router.navigate(['/admin/subModule/edit/' + id]);
  }

  getSubModuleList() {
    this.service.viewSubModuleDetails().subscribe((responseData: any) => {
      this.inductionList = responseData;

      console.log(this.inductionList);
    });
  }

  deleteSubModule(id: any) {
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

        this.service.deleteSubModule(id).subscribe(
          (data: any) => {
            // Show success message with SweetAlert

            Swal.fire({
              title: 'Record Deleted Successfully!',

              text: data.message,

              icon: 'success',

              confirmButtonText: 'OK',
            }).then(() => {
              this.getSubModuleList();
            });
          },
          (error) => {
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
}
