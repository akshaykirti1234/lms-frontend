import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder ,
     private actRoute : ActivatedRoute,
     private loginService : LoginService,
     private router : Router
    ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^(?=.*[a-z])(?=.*[0-9]).{7,}$')]],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.value.password !== this.changePasswordForm.value.repeatPassword) {
        alert('New password and repeat password must be the same.');
        return;
      }
      // Handle form submission here
      else{
        this.changePasswordForm.value.email = this.actRoute.snapshot.paramMap.get('email');
        this.loginService.changePassword(this.changePasswordForm.value).subscribe((data)=>{
          Swal.fire({
            title: 'Success',
            text: 'Password Changed Successfully. Go back to Login Page',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Go to Login Page',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/auth/login');
            }
          });
        });
        console.log('Form submitted successfully');

      }
      
    
    }
  }
}
