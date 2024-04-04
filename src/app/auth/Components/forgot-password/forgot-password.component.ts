import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  resetForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder , private loginService : LoginService , private router : Router) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true;
    
    
    setTimeout(() => {
      this.loginService.checkEmail(this.resetForm.value.email).subscribe((data)=>{
        if(data == true){
          this.submitted = false;
          this.router.navigate(['/auth/otp/' , this.resetForm.value.email]);
        }
        else if(data == false){
          this.loading = false;
        }
      },(error)=>{
        Swal.fire({
          title: 'Internal Server Error',
          text: 'Please try again later!',
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.submitted = false;
            this.loading = false;
            console.log(error);
          }
        });
      })
    }, 5000);
  }

  
}

 
