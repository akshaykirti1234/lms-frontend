import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ManageUserService } from '../../Services/manage-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  usersList: any;
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private service: ManageUserService, private router: Router) { }

  ngOnInit() {
    this.getUsersList();
  }

  getTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getUsersList();
  }
  getUsersList() {
    this.service.getUsersList().subscribe((data: any) => {
      this.usersList = data;
    });
  }

  editUser(userId: any) {
    this.router.navigateByUrl('/admin/manageUser/editUser/' + userId);
  }

  deleteUser(userId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUserById(userId).subscribe((data: any) => {
          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          );
          this.getUsersList();
        }, (error: any) => {
          Swal.fire('Error', 'Something went wrong !', 'error');
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        );
      }
    });
  }
}
