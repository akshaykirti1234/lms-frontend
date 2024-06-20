import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ManageUserService } from '../../Services/manage-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  UserMasterForm: any;

  emailList: any;

  locationList: any;

  userId: any;

  uploadForm: any;

  selectedFile: File | null = null; // Variable to store the selected file

  showUploadValidationMessage: boolean = false; // Flag to show/hide upload validation message

  uploadValidationMessage: string = ''; // Validation message

  userDetailsById: any;


  constructor(
    private fb: FormBuilder,
    private userService: ManageUserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.UserMasterForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],

      contactNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{0,10}$'),
          Validators.maxLength(10),
        ],
      ],

      emailId: ['', [Validators.required, Validators.email], [this.emailExistsValidator.bind(this)]],

      department: [
        '',
        // [Validators.required, Validators.pattern('^[A-Za-z \\p{L}]+$')]
        [Validators.required]
      ],

      designation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z ]+$')],
      ],

      location: ['', Validators.required],

      password: [''],

      normalPassword: [''],

      fileInput: ['']
    });
  }

  ngOnInit(): void {
    // Fetch email IDs from backend when component initializes
    this.fetchEmailList();

    //for fetching location at time of pag eloading
    this.fetchLocation();

    //getting userId at time of edit
    this.userId = this.actRoute.snapshot.params['userId'];
    if (this.userId > 0) {
      this.editUser();
    } else {
      this.userId = 0;
    }
  }

  // Fetch email IDs from backend when component initializes
  fetchEmailList() {
    this.userService.getEmailList().subscribe(
      (data: any) => {
        this.emailList = data;
      },
      (error: any) => {
        console.error('Error fetching email list:', error);
      }
    );
  }

  // Define the emailExistsValidator function
  emailExistsValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      const email = control.value;
      if (!this.emailList) {
        console.error('Email list is null or undefined');
        resolve(null); // Resolve with null to avoid errors
        return;
      }


      if (this.userId > 0) {

        if (this.userDetailsById.EMAILID !== email) {
          const emailExists = this.emailList.some((item: any) => item.EMAILID === email);
          resolve(emailExists ? { emailExists: true } : null);
        }

      }
      else {
        const emailExists = this.emailList.some((item: any) => item.EMAILID === email);
        resolve(emailExists ? { emailExists: true } : null);
      }

    });

  }

  //for fetching location
  fetchLocation() {
    this.userService.getlocationList().subscribe((responseData: any) => {
      this.locationList = responseData;
    });
  }

  //for submit user details
  submit() {
    let errorFlag = 0;
    const fullName = this.UserMasterForm.get('fullName');
    const contactNo = this.UserMasterForm.get('contactNo');
    const emailId = this.UserMasterForm.get('emailId');
    const department = this.UserMasterForm.get('department');
    const designation = this.UserMasterForm.get('designation');
    const location = this.UserMasterForm.get('location');

    if (fullName?.invalid && errorFlag === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "FullName can't be blank",
      });

      errorFlag = 1;
      fullName.markAsTouched();
    }
    if (contactNo?.invalid && errorFlag === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "ContactNo can't be blank",
      });

      errorFlag = 1;
      contactNo.markAsTouched();
    }
    if (emailId?.invalid && errorFlag === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "EmailId can't be blank",
      });

      errorFlag = 1;
      emailId.markAsTouched();
    }
    if (emailId?.value && emailId?.errors?.emailExists) {
      // Swal error message for existing email ID
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This email ID already exists.',
      });
      errorFlag = 1;
      emailId.markAsTouched();
    }

    if (department?.invalid && errorFlag === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Department can't be blank",
      });

      errorFlag = 1;
      department.markAsTouched();
    }
    if (designation?.invalid && errorFlag === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Designation can't be blank",
      });

      errorFlag = 1;
      designation.markAsTouched();
    }
    if (location?.invalid && errorFlag === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "LocationId can't be blank",
      });

      errorFlag = 1;
      location.markAsTouched();
    }

    if (errorFlag === 0) {
      Swal.fire({
        title: this.userId == 0 ? 'Submit' : 'Update',
        text:
          this.userId == 0
            ? 'Do you want to submit?'
            : 'Do you want to update?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with submission

          this.UserMasterForm.value.userId = this.userId;
          this.userService
            .saveUserMaster(this.UserMasterForm.value)
            .subscribe((responseData: any) => {
              // Display success message after submission
              if (this.userId == 0) {
                Swal.fire('Success!', 'User saved successfully', 'success');
              } else {
                Swal.fire('Success!', 'User update successfully', 'success');
              }
              this.router.navigate(['/admin/manageUser/viewUser']);
            });
        }
      });
    }
  }
  //for patch the value to UserMasterForm
  editUser() {
    this.userService.getUserById(this.userId).subscribe((data: any) => {
      this.userDetailsById = data;

      this.UserMasterForm.patchValue({
        fullName: data.FULLNAME,
        contactNo: data.CONTACTNO,
        emailId: data.EMAILID,
        department: data.DEPARTMENT,
        designation: data.DESIGNATION,
        location: data.LOCATIONID,
        password: data.UPASSWORD,
        normalPassword: data.NORMALPASSWORD,
      });
    });
  }

  //for cancel operation redirect to view user page
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
        this.router.navigate(['/admin/manageUser/viewUser']);
      }
    });
  }

  //iInserting record through  uploading xl file

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Store the selected file
    // Check if the selected file is not an Excel file

    if (!this.selectedFile?.name.endsWith('.xlsx')) {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage =
        'Please select an only Excel file (.xlsx) only.';

      const fileInput: HTMLInputElement | null = document.querySelector('#fileInput');
      if (fileInput) {
        // Reset the file input by setting its value to an empty string
        fileInput.value = '';
      }
    } else {
      this.showUploadValidationMessage = false; // Hide validation message
    }
  }

  downloadExcel() {
    this.userService.downloadExcel().subscribe((data: any) => {
      const blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;

      link.download = 'UserList.xlsx';

      link.click();

      window.URL.revokeObjectURL(url);
    });
  }

  // normal field validation message

  validateAndImport() {
    // Check if a file is selected

    if (!this.selectedFile) {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select a file to import.';

      return;
    }

    // Check if the selected file is an Excel file

    if (!this.selectedFile.name.endsWith('.xlsx')) {

      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select an only Excel file (.xlsx) only.';

      return;

    }

    // Proceed with import

    this.importData();
  }

  importData() {

    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('file', this.selectedFile);

      this.userService.importExcel(formData).subscribe(
        (data: any) => {
          Swal.fire('Data Saved Succesfully', 'User data saved Successfully', 'success');
        },

        (error: any) => {
          console.error('Error importing file:', error);
          Swal.fire('Error', 'Invalid Data format found. Please Check Your Excel and try again', 'error');
        }
      );

      // Clear the selected file reference

      this.selectedFile = null;
    } else {
      // Handle case when no file is selected
      Swal.fire('No File Selected.')
    }
    const fileInput: HTMLInputElement | null = document.querySelector('#fileInput');
    if (fileInput) {
      // Reset the file input by setting its value to an empty string
      fileInput.value = '';
    }
  }

  //swal pop up validation

  // validateAndImport() {

  //   // Check if a file is selected

  //   if (!this.selectedFile) {

  //     Swal.fire({

  //       icon: 'error',

  //       title: 'Oops...',

  //       text: 'Please select a file to import.'

  //     });

  //     return;

  //   }

  //   // Check if the selected file is an Excel file

  //   if (!this.selectedFile.name.endsWith('.xlsx')) {

  //     Swal.fire({

  //       icon: 'error',

  //       title: 'Oops...',

  //       text: 'Please select an Excel file (.xlsx) only.'

  //     });

  //     return;

  //   }

  //   // Proceed with import

  //   this.importData();
}
