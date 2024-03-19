import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubModuleService } from '../../Services/sub-module.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-sub-module',
  templateUrl: './add-sub-module.component.html',
  styleUrls: ['./add-sub-module.component.css'],
})
export class AddSubModuleComponent implements OnInit {
  ModuleList: any[] = [];

  inductionId: any;

  submoduleId: any;

  pathValue: any;

  constructor(
    private fb: FormBuilder,
    private service: SubModuleService,
    private router: Router,
    private actRout: ActivatedRoute
  ) {
    this.inductionForm = this.fb.group({
      submoduleId: [''],

      moduleId: ['', Validators.required],

      submoduleName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
      ],
    });
  }

  inductionForm: FormGroup;

  subInductionList: any[] = [];

  ngOnInit(): void {
    this.getModuleList();

    this.actRout.params.subscribe((params) => {
      this.submoduleId = params['id'];

      if (this.submoduleId > 0) {
        this.editBind();
      } else {
        this.submoduleId = 0;
      }
    });
  }

  getModuleList() {
    this.service.getModuleList().subscribe((responseData: any) => {
      this.ModuleList = responseData;

      console.log(responseData);
    });
  }

  submit() {
    const formData = this.inductionForm.value;

    formData.submoduleId = this.submoduleId;

    // Check if the moduleId field is empty

    if (this.inductionForm.controls['moduleId'].errors?.['required']) {
      Swal.fire({
        title: 'Error!',

        text: 'Module Name is required',

        icon: 'error',

        confirmButtonText: 'OK',
      });

      return; // Stop form submission
    }

    // Check if the submoduleName field is empty

    if (this.inductionForm.controls['submoduleName'].errors?.['required']) {
      Swal.fire({
        title: 'Error!',

        text: 'Sub-Module Name is required',

        icon: 'error',

        confirmButtonText: 'OK',
      });

      return; // Stop form submission
    }

    // Show confirmation dialog before submitting the form

    Swal.fire({
      title: '',

      text:
        this.submoduleId === 0
          ? 'Do you want to submit the form?'
          : 'Do you want to Upadte the form?',

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Yes',

      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.inductionForm.valid) {
          // Proceed with form submission

          this.service.saveSubModule(formData).subscribe(
            (response: any) => {
              // Show success message with SweetAlert

              Swal.fire({
                title:
                  this.submoduleId === 0
                    ? 'Data Saved Successfully!'
                    : 'Data Updated Successfully!',

                text: response.message,

                icon: 'success',

                confirmButtonText: 'OK',
              }).then(() => {
                // Navigate to another page if needed

                this.router.navigate(['/admin/subModule/viewSubModule']);
              });
            },
            (error) => {
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
    this.service.edit(this.submoduleId).subscribe(
      (data: any) => {
        this.inductionForm.patchValue({
          submoduleName: data.SUBMODULENAME,

          moduleId: data.MODULEID,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/dashboard/viewInduction']);
  }

  onKeyPress(event: KeyboardEvent) {
    const allowedChars = /^[a-zA-Z\s]*$/;

    const inputChar = String.fromCharCode(event.charCode);

    if (!allowedChars.test(inputChar)) {
      event.preventDefault();
    }
  }
}
