import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    console.log(this.resetForm.value);
    
    setTimeout(() => {
      this.loading = false;
      this.loginService.checkEmail(this.resetForm.value.email).subscribe((data)=>{
        if(data == true){
          this.router.navigate(['/auth/otp/' , this.resetForm.value.email]);
        }
      },(error)=>{
          console.log(error);
      })
    }, 7000);
  }

  
}

 
