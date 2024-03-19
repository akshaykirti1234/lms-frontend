import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthorServiceService } from '../../Services/author-service.service';
@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.css'],
})
export class ViewAuthorComponent {
  authorList: any;

  // for pagination
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private authorService: AuthorServiceService, private router: Router) { }

  ngOnInit() {
    this.getAllAuthors();
  }
  getAllAuthors() {
    this.authorService.viewAuthor().subscribe((response) => {
      this.authorList = response;
    });
  }
  // delete(id: any) {
  //  // alert(id)
  //   this.authorService.deleteAuthor(id).subscribe(data=> {
  //   //  console.log(data);
  //   Swal.fire("Delete" , "Deleted Succesfully" , "success");
  //   this.getAllAuthors();
  //   // this.ngOnInit();
  // },(error : any)=>{
  //   console.log(error);

  // }
  // );
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
        this.authorService.deleteAuthor(id).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',

              title: 'Deleted Successfully',
            });

            this.getAllAuthors();
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
    // alert(id)
    this.router.navigate(['/admin/author/edit/' + id]);
  }

  //pagination functionality
  getTableDataChange(event: any) {

    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAllAuthors();
  }
}
