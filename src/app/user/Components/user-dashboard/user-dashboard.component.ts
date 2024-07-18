import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardService } from '../../Services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  viewModuleLogoUrl: string = environment.apiUrl + 'viewLogo';


  public userName = sessionStorage.getItem('fullName');
  currentTime: any;
  public updatePasswordForm: any;

  public moduleList: any;
  public subModuleList: any;
  emailId = sessionStorage.getItem('emailId');
  mobile = sessionStorage.getItem('mobileNo');
  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.initializeForm();
    // setInterval(() => {
    //   this.currentTime = new Date();
    // }, 1000);
  }

  //Initialize changePasswordForm
  public initializeForm() {
    this.updatePasswordForm = this.fb.group({
      emailId: [''],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    });
    this.updatePasswordForm.get('confirmPassword').setValidators([Validators.required, this.matchPasswords('newPassword')]);


    //call getAllModules
    this.getAllModules();

  }


  matchPasswords(passwordField: string) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let input = control.value;
      let isValid = control.root.value[passwordField] == input
      if (!isValid)
        return { 'passwordMismatch': !isValid }
      else
        return null;
    };
  }

  //Submit Update Password Form 
  public submitForm(): void {
    if (this.updatePasswordForm.valid) {
      this.updatePasswordForm.get('emailId').setValue(sessionStorage.getItem('emailId'));
      this.dashboardService.updatePassword(this.updatePasswordForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            text: ''
          });
        },
        error: (error) => {
          if (error.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Current Password is not matched',
              text: ''
            });
          } else if (error.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'Not Found',
              text: ''
            });
          } else if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Bad Request',
              text: ''
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Internal Server Error',
              text: ''
            });
            console.log(error.status);
          }
        }
      });
    }
    this.initializeForm();
  }




  //log out
  public logout(): void {
    Swal.fire({
      title: 'Confirm Logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(['/home']);
      }
    });
  }


  //Get ModuleList
  public getAllModules() {
    this.dashboardService.getAllModules().subscribe({
      next: (response) => {
        this.moduleList = response.body;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  //get subModuleByModuleId
  public getSubModuleByModuleId(moduleId: any) {
    this.dashboardService.getSubModuleByModuleId(moduleId).subscribe({
      next: (response) => {
        this.subModuleList = response.body;
      },
      error: (error) => {
        console.log(error);
        this.subModuleList = null;
      }
    });
  }


  onSubModuleClick(submoduleId: any) {
    this.router.navigate(['/user/viewSchedule', submoduleId]);
  }

}
