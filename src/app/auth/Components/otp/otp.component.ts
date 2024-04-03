import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otpForm: FormGroup;

  constructor(private fb: FormBuilder ,
     private loginService : LoginService ,
    private actRoute : ActivatedRoute,
    private router : Router) {
    this.otpForm = this.fb.group({
      first: ['', Validators.required],
      second: ['', Validators.required],
      third: ['', Validators.required],
      fourth: ['', Validators.required],
      fifth: ['', Validators.required],
      sixth: ['', Validators.required]
    });
  }

  get otpControls() {
    return this.otpForm.controls;
  }

  onInputChange(index: number, event: any) {
    const inputs = this.otpInputs.toArray();

    if (event.target.value && event.target.value.length > 0) {
      if (index < inputs.length - 1) {
        inputs[index + 1].nativeElement.focus();
      }
    } else {
      if (index > 0) {
        inputs[index - 1].nativeElement.focus();
      }
    }
  }



  verifyOtp() {
    const otp = [
      this.otpForm.get('first')?.value,
      this.otpForm.get('second')?.value,
      this.otpForm.get('third')?.value,
      this.otpForm.get('fourth')?.value,
      this.otpForm.get('fifth')?.value,
      this.otpForm.get('sixth')?.value
    ].join('');
    this.otpForm.value.otp = otp;
    this.otpForm.value.email = this.actRoute.snapshot.paramMap.get('email');
    
    this.loginService.verifyOtp(this.otpForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/auth/change-password/' , this.otpForm.value.email]);
      },
      (error: any) => {
        // Handle error response from backend
        console.error(error);
      }
    );
  }
}
