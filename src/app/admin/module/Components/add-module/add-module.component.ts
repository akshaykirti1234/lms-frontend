import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuleserviceService } from '../../Services/moduleservice.service';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css'],
})
export class AddModuleComponent {
  moduleMasterForm: any;
  moduleId: any;
  viewModuleLogoUrl: string = 'http://localhost:8085/viewLogo';
  showUploadValidationMessage = false;
  uploadValidationMessage: any;
  constructor(
    private fb: FormBuilder,
    private service: ModuleserviceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.moduleMasterForm = this.fb.group({
      moduleName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      moduleDescription: ['', Validators.required],
      logo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.moduleId = this.activatedRoute.snapshot.paramMap.get('moduleId');

    if (this.moduleId > 0) {
      this.getModuleById(this.moduleId);
    } else {
      this.moduleId = 0;
    }
  }

  submit() {

    let errorFlag = 0;
    const moduleName = this.moduleMasterForm.get('moduleName');
    const logo = this.moduleMasterForm.get('logo');
    const moduleDescription = this.moduleMasterForm.get('moduleDescription');
    if (moduleName?.invalid && errorFlag === 0) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "ModuleName can't be blank",
      });

      errorFlag = 1;
      moduleName.markAsTouched();

    }
    if (this.moduleId === 0) {
      if (logo?.invalid && errorFlag === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "ModuleLogo can't be blank",
        });

        errorFlag = 1;
        logo.markAsTouched();
      }
    }
    if (
      (moduleDescription?.invalid || !moduleDescription?.value?.trim()) && errorFlag === 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "ModuleDescription can't be blank",
      });

      errorFlag = 1;
      moduleDescription.markAsTouched();
    }

    if (errorFlag === 0) {

      Swal.fire({
        title: this.moduleId == 0 ? 'Submit' : 'Update',
        text: this.moduleId == 0 ? 'Do you want to submit?' : 'Do you want to update?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with submission
          this.moduleMasterForm.value.moduleId = this.moduleId;
          this.service.saveModuleDetails(this.moduleMasterForm.value).subscribe(
            (data: any) => {
              console.log(data);
              // Display success message after submission
              if (this.moduleId == 0) {
                Swal.fire(
                  'Success!',
                  'Module saved successfully',
                  'success'
                );
              } else {
                Swal.fire(
                  'Success!',
                  'Module update successfully',
                  'success'
                );
              }
              this.router.navigate(['/admin/module/viewModule']);
            },
            (error: any) => {
              console.log(error);
              // Display error message if submission fails
              Swal.fire('Error!', 'Failed to save module', 'error');
            }
          );
        }
      });
    }
  }

  //for file upload
  onFileSelected(event: any) {
    if (event.target != null) {
      let file = event.target.files[0];
      console.log(file);
      if (!file.name.endsWith('.jpg') && !file.name.endsWith('.jpeg') && !file.name.endsWith('.png') && !file.name.endsWith('.gif') && !file.name.endsWith('.svg') && !file.name.endsWith('.webp') && !file.name.endsWith('.bmp') && !file.name.endsWith('.tiff')) {
        // Invalid image file extension
        this.showUploadValidationMessage = true; // Show validation message

        this.uploadValidationMessage = 'Please select an only Excel file (.jpg,.jpeg,.png,.gif,.svg,.webp,.bmp,.tiff) only.';

        const fileInput: HTMLInputElement | null = document.querySelector('#logo');

        console.log(fileInput);

        if (fileInput) {
          // Reset the file input by setting its value to an empty string
          fileInput.value = '';
        }
      } else {
        this.showUploadValidationMessage = false; // Hide validation message

        let fileId = event.target.id;
        const fileData = new FormData();
        fileData.append('file', file);

        this.service.setFilePath(fileData).subscribe(
          (data: any) => {

            if (this.moduleMasterForm.controls[fileId]) {
              this.moduleMasterForm.controls[fileId].setValue(data.fileName);
            } else {
              console.error(`Control with id '${fileId}' not found in form.`);
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
  }


  getModuleById(moduleId: any) {
    this.service.getModuleById(moduleId).subscribe(
      (data: any) => {
        console.log(data);
        this.moduleMasterForm.patchValue({
          moduleName: data.moduleName,
          moduleDescription: data.moduleDescription,
          logo: data.logo
        });


      },
      (error: any) => {
        console.log(error);
      }
    );
  }

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
        this.router.navigate(['/admin/module/viewModule']);
      }
    });
  }
}
