import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TechnologyServiceService } from '../../Services/technology-service.service';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.css']
})
export class AddTechnologyComponent {
  technologyForm: any;
  techId: any;
  constructor(private fromBuilder: FormBuilder, private techService: TechnologyServiceService, private router: Router, private actRout: ActivatedRoute) {
    this.technologyForm = this.fromBuilder.group({
      techId: [''],
      techName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    })
  }

  ngOnInit() {
    this.editTechnology();

  }

  //Normal Message validation method

  // saveTechForm():void{
  //   this.techService.saveTechnology(this.technologyForm.value).subscribe((response)=>{
  //     console.log(response);
  //     this.router.navigate(['/dashboard/viewTechnology']);

  // }
  //   )}

  // public saveTechForm(): void {

  //   if (this.technologyForm.valid) {



  //     Swal.fire({

  //       title: this.technologyForm.get('techId').value === '' ? 'Do you want to Save ?' : 'Do you want to Update ?',

  //       text: "",

  //       icon: 'warning',

  //       showCancelButton: true,

  //       cancelButtonText: 'No',

  //       confirmButtonColor: '#3085d6',

  //       cancelButtonColor: '#d33',

  //       confirmButtonText: 'Yes'

  //     }).then((result) => {

  //       if (result.isConfirmed) {

  //         this.techService.saveTechnology(this.technologyForm.value).subscribe({

  //           next: (response) => {

  //             Swal.fire({

  //               icon: 'success',

  //               title: this.technologyForm.get('techId').value === '' ? 'Technology Saved Successfully' : 'Update Successfully',

  //             }).then((result) => {

  //               if (result.isConfirmed) {

  //                 this.router.navigate(['/dashboard/viewTechnology']);

  //               }

  //             });

  //           },

  //           error: (error) => {

  //             Swal.fire({

  //               icon: 'error',

  //               title: 'Something Went Wrong!',

  //             });

  //           }

  //         });

  //       }

  //     });

  //   } else {

  //     Swal.fire({

  //       icon: 'error',

  //       title: 'Please fill the fields correctly!',

  //       text: ''

  //     });
  //     this.technologyForm.markAllAsTouched();
  //   }
  // }

  //SWal message validation method

  saveTechForm(): void {
    if (this.technologyForm.valid) {
      Swal.fire({
        title: this.technologyForm.get('techId').value === '' ? 'Do you want to Save?' : 'Do you want to Update?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.techService.saveTechnology(this.technologyForm.value).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: this.technologyForm.get('techId').value === '' ? 'Technology Saved Successfully' : 'Update Successful',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/technology/viewTechnology']);
                }
              });
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
    } else {
      let errorMessage = '';
      if (this.technologyForm.get('techName').errors.required) {
        errorMessage = 'Please enter the technology name.';
      } else if (this.technologyForm.get('techName').errors.pattern) {
        errorMessage = 'Technology name can only contain letters and spaces.';
      }

      Swal.fire({
        // icon: 'error',
        // title: 'Invalid Input',
        text: errorMessage
      });
      this.technologyForm.controls['techName'].markAsTouched();
    }
  }

  editTechnology(): void {
    this.actRout.params.subscribe((paramData) => {
      this.techId = paramData['id'];
      this.techService.editTechnology(this.techId).subscribe((response) => {
        this.technologyForm.patchValue({
          techId: response.techId,
          techName: response.techName,

        })

      });

    }
    )
  }
}
