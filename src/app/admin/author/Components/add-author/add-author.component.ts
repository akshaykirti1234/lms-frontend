import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthorServiceService } from '../../Services/author-service.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {
  authorForm: any;
  authId: any;
  constructor(private fb: FormBuilder, private authorService: AuthorServiceService, private router: Router, private actRout: ActivatedRoute) {
    this.authorForm = this.fb.group({
      authId: [''],
      authName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit() {
    this.actRout.params.subscribe((params) => {
      this.authId = params['id'];
      console.log(this.authId)
      this.authorService.editAuthor(this.authId).subscribe(response => {
        console.log(response);

        this.authorForm.patchValue({
          authId: response.authId,
          authName: response.authName,
          email: response.email,
          phone: response.phone
        });

      });

    }
    )
  }

  // saveForm(){
  //  // const data = this.authorForm.value;
  //  if(this.authorForm.valid){
  //   this.authorService.saveAuthor(this.authorForm.value).subscribe(
  //     (data : any) => {
  //       Swal.fire("Success" , "Data Saved Successfully", "success");
  //       this.router.navigate(["/dashboard/viewAuthor"]);
  //    },
  //      (error : any) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Something Went Wrong!',
  //       });
  //      }

  //   )}
  // else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Please fill in all required fields correctly!',
  //       text: ''
  //     });
  //   this.authorForm.markAllAsTouched();
  // }

  public saveForm(): void {

    if (this.authorForm.valid) {



      Swal.fire({

        title: this.authorForm.get('authId').value === '' ? 'Do you want to submit ?' : 'Do you want to Update ?',

        text: "",

        icon: 'warning',

        showCancelButton: true,

        cancelButtonText: 'No',

        confirmButtonColor: '#3085d6',

        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes'

      }).then((result) => {

        if (result.isConfirmed) {

          this.authorService.saveAuthor(this.authorForm.value).subscribe({

            next: (response) => {

              Swal.fire({

                icon: 'success',

                title: this.authorForm.get('authId').value === '' ? 'Author Saved Successfully' : 'Update Successfully',

              }).then((result) => {

                if (result.isConfirmed) {

                  this.router.navigate(['/admin/author/viewAuthor']);

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

      Swal.fire({

        icon: 'error',

        title: 'Please fill the fields correctly!',

        text: ''

      });
      this.authorForm.markAllAsTouched();
    }


    // if (this.authorForm.valid) {
    //   this.authorService.saveAuthor(this.authorForm.value).subscribe({
    //     next: (response) => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Author Saved Successfully',
    //       });
    //       this.router.navigate(['/dashboard/viewAuthor']);
    //     },
    //     error: (error) => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Something Went Wrong!',
    //       });
    //     }
    //   });
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Please fill in all required fields correctly!',
    //     text: ''
    //   });
    // }
  }

  // phoneNumberValidator(): any {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const phoneNumber = control.value;
  //     // Check if the input contains only digits and has exactly 10 characters
  //     if (!/^\d{10}$/.test(phoneNumber)) {
  //       return { invalidPhoneNumber: true };
  //     }
  //     return null;
  //   };
  // }


  cancel() {
    Swal.fire({
      title: 'Cancel',
      text: 'Are you sure you want to cancel?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, navigate away
        this.router.navigate(['/admin/author/viewAuthor']);
      }
    });
  }

}
