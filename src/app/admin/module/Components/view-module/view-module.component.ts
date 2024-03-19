import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModuleserviceService } from '../../Services/moduleservice.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.css'],
})
export class ViewModuleComponent {
  moduleList: any;
  viewModuleLogoUrl: string = 'http://localhost:8080/viewLogo';
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private service: ModuleserviceService, private router: Router) { }

  ngOnInit() {
    this.getModuleDetails();
  }

  getTableDataChange(event: any) {
    alert("sima");
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getModuleDetails();
  }

  getModuleDetails() {
    this.service.getModuleDetails().subscribe(
      (data: any) => {
        console.log(data);
        this.moduleList = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  editModule(moduleId: any) {
    this.router.navigate(['/admin/module/editModule/' + moduleId]);
  }

  deleteModule(moduleId: any) {
    Swal.fire({
      title: 'Delete',
      text: 'Do you want to delete the module?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        this.service.deleteModule(moduleId).subscribe(
          (data: any) => {
            console.log(data);
            // Display success message after deletion
            Swal.fire('Success!', 'Module deleted successfully', 'success');
            // Refresh module details
            this.getModuleDetails();
          },
          (error: any) => {
            console.log(error);
            // Display error message if deletion fails
            Swal.fire('Error!', 'Failed to delete module', 'error');
          }
        );
      }
    });
  }
}
