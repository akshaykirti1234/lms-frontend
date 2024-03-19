import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SessionMasterService } from '../../Services/session-master.service';

@Component({
  selector: 'app-view-session',
  templateUrl: './view-session.component.html',
  styleUrls: ['./view-session.component.css'],
})
export class ViewSessionComponent {
  viewFileUrl: string = 'http://localhost:8085/viewFile';
  sessionList: any;
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];
  constructor(private sessionService: SessionMasterService, private router: Router) { }

  ngOnInit() {
    this.getAllSessionList();
  }
  getAllSessionList() {
    this.sessionService.getAllSessionList().subscribe((data: any) => {
      this.sessionList = data;
    });
  }
  //pagination functionality
  getTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAllSessionList();
  }

  deleteSession(id: any) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.deleteSession(id).subscribe(
          (data) => {
            Swal.fire(
              'Data Deleted',
              'The data has been successfully deleted.',
              'success'
            );
            this.getAllSessionList();
          },
          (error) => {
            Swal.fire(
              'Error',
              'An error occurred while fetching the kt data.',
              'error'
            );
          }
        );
      }
    });
  }
  editSession(id: any) {
    this.router.navigate(['/admin/session/editSession', id]);
  }
}
