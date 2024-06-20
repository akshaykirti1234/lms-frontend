import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TechnologyServiceService } from '../../Services/technology-service.service';

@Component({
  selector: 'app-view-technology',
  templateUrl: './view-technology.component.html',
  styleUrls: ['./view-technology.component.css']
})
export class ViewTechnologyComponent {
  technologyList: any;
  // for pagination
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private techService: TechnologyServiceService, private router: Router) {
  }

  ngOnInit() {
    this.getAllTechnology();
  }
  getAllTechnology() {
    this.techService.viewTechnology().subscribe((response) => {
      
      this.technologyList = response;

    }
    )
  }

  // deleteTech(id:any):void{
  //   this.techService.deleteTechnology(id).subscribe((response)=>{
  //     this.ngOnInit();

  // }
  //   )}

  public deleteTech(id: any): void {
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
        this.techService.deleteTechnology(id).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',

              title: 'Deleted Successfully',
            });

            this.getAllTechnology();
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

  editTech(id: any) {
    this.router.navigate(['/admin/technology/editTechnology/' + id]);
  }


  //pagination functionality
  getTableDataChange(event: any) {

    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAllTechnology();
  }


}
