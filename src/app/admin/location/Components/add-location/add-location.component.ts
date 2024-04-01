import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LocationService } from '../../Services/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent {
  locationId: any;
  submoduleId: any;

  constructor(
    private fb: FormBuilder,
    private service: LocationService,
    private router: Router,
    private actRout: ActivatedRoute
  ) {
    this.locationMasterForm = this.fb.group({
      locationId: [''],
      locationName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
      ],
    });
  }

  locationMasterForm: FormGroup;

  //subInductionList: any[] = [];
  ngOnInit(): void {
    this.actRout.params.subscribe((params) => {
      this.locationId = params['id'];
      if (this.locationId > 0) {
        this.editBind();
      } else {
        this.locationId = 0;
      }
    });
  }
  submit() {
    const formData = this.locationMasterForm.value;
    formData.locationId = this.locationId;

    // Check if the submoduleName field is empty
    if (this.locationMasterForm.controls['locationName'].errors?.['required']) {
      Swal.fire({
        title: 'Error!',
        text: 'Location Name is required',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return; // Stop form submission
    }

    // Show confirmation dialog before submitting the form
    Swal.fire({
      title: '',
      text:
        this.locationId === 0
          ? 'Do you want to submit the form?'
          : 'Do you want to Upadte the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.locationMasterForm.valid) {
          // Proceed with form submission
          this.service.saveLocation(formData).subscribe(
            (response: any) => {
              // Show success message with SweetAlert
              Swal.fire({
                title:
                  this.locationId === 0
                    ? 'Data Saved Successfully!'
                    : 'Data Updated Successfully!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'OK',
              }).then(() => {
                // Navigate to another page if needed
                this.router.navigate(['/admin/location/viewLocation']);
              });
            },
            (error: any) => {
              // Show error message with SweetAlert
              Swal.fire({
                title: 'Error!',
                text: 'Failed to submit the form. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          );
        } else {
          // Show validation error message with SweetAlert
          Swal.fire({
            title: 'Error!',
            text: 'Please fill in all required fields before submitting the form.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  }

  editBind() {
    this.service.editLoc(this.locationId).subscribe(
      (data: any) => {
        this.locationMasterForm.patchValue({
          locationName: data.LOCATIONNAME,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/admin/location/viewLocation']);
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /^[a-zA-Z\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }
}
