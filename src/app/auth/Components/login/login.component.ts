import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Captcha } from 'src/app/captcha';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  captcha: Captcha = { id: '', text: '' };
  login_form: FormGroup;
  response: any; // Variable to hold the response data
  result: any;
  submitted = false;
  title = 'formvalidation';
  errorMessage: string = '';
  captchaError: string = '';
  userNameText = 'Mobile Number';
  userLoginType = 'C';
  siteURL = 'http://localhost:4200/';
  constructor(
    private formbuilder: FormBuilder,
    private route: Router,
    private servicelogin: LoginService
  ) {
    this.login_form = this.formbuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      answer: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.generateCaptcha();
  }

  toggleField() {
    this.userLoginType = this.login_form.value.userType;

    const username = this.login_form.get('username');
    if (this.userLoginType != 'C') {
      this.userNameText = 'User Name';
      username?.setValidators([Validators.required]);
    } else {
      this.userNameText = 'Mobile Number';
      username?.setValidators([
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]);
    }
    username?.updateValueAndValidity();
  }

  onLogin() {
    let errFlag = 0;

    //-----------------Mobile No --------------------
    const mobilenocheck = this.login_form.get('email');
    if (errFlag == 0 && mobilenocheck && mobilenocheck.invalid) {
      errFlag = 1;

      mobilenocheck.markAsTouched();
    }
    if (errFlag == 0 && mobilenocheck && mobilenocheck.hasError('pattern')) {
      errFlag = 1;
    }
    //-------------------------------------

    //-----------------Password  --------------------
    const passwordCheck = this.login_form.get('password');
    if (errFlag == 0 && passwordCheck && passwordCheck.invalid) {
      errFlag = 1;

      passwordCheck.markAsTouched();
    }
    //-------------------------------------

    //-----------------captcha  --------------------
    const captchaCheck = this.login_form.get('answer');
    if (errFlag == 0 && captchaCheck && captchaCheck.invalid) {
      errFlag = 1;

      captchaCheck.markAsTouched();
    }

    //-------------------------------------

    if (errFlag == 0) {
      this.login_form.value.captchaId = this.captcha.id;
      // this.commonService.setLoader(true);
      this.servicelogin
        .generateTookan(JSON.stringify(this.login_form.value))
        .subscribe(
          (response: any) => {
            // this.commonService.setLoader(false);

            this.response = JSON.parse(response);
            this.handleLoginResponse();
          },
          (error: any) => {
            // this.commonService.setLoader(false);

            this.generateCaptcha();
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to Login.  Something wrong. ',
              confirmButtonText: 'OK',
            });
          }
        );
    }
  }
  handleLoginResponse() {
    this.generateCaptcha();

    if (this.response.status === 200) {
      this.servicelogin.loginUser(this.response.result);

      sessionStorage.setItem('fullName', this.response.fullName);
      sessionStorage.setItem('userType', this.response.userType);
      sessionStorage.setItem('emailId', this.response.emailId);
      sessionStorage.setItem('mobileNo', this.response.mobileNo);
      sessionStorage.setItem('isLoggedIn', '1');

      if (this.response.userType == 'Admin') {
        alert('Login Successfull , Admin');
        this.route.navigateByUrl('/admin');
      } else if (this.response.userType == '2') {
        alert('Login Successfull , User');
        // this.route.navigateByUrl('/officer/officer-dashboard');
      }

      // else if (this.response.userType == 'A') {
      //   sessionStorage.setItem('isFirstLogin', this.response.isFirstLogin);
      //   if (this.response.isFirstLogin == 1) {
      //     this.route.navigateByUrl('/change-password');
      //   } else {
      //     this.route.navigateByUrl('/admin/new-dashboard');
      //   }
      // }
    }

    //block user
    // else if (this.response.status === 444) {
    //   // Login failed
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error!',
    //     text: ' Your Account has been blocked ! Contact your administrator',
    //     confirmButtonText: 'OK',
    //   }).then(() => {
    //     this.servicelogin.userLogOut();
    //     this.route.navigateByUrl('/login');
    //   });
    //}
    else if (this.response.status === 500) {
      // Login failed
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to Login.  Invalid credentials. ',
        confirmButtonText: 'OK',
      }).then(() => {
        this.login_form.reset();

        this.login_form.patchValue({
          userType: this.userLoginType,
        });
      });
    } else if (this.response.status === 0) {
      // Login failed
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Input. ',
        confirmButtonText: 'OK',
      }).then(() => {
        this.login_form.reset();

        this.login_form.patchValue({
          userType: this.userLoginType,
        });
      });
    } else if (this.response.status === 223) {
      // Login failed
      // this.response.result = this.captchaError;
      this.captchaError = 'Invalid Captcha .';

      this.login_form.reset();

      this.login_form.patchValue({
        userType: this.userLoginType,
      });
    }

    //when the token expired or the token are not perfect they will logout automatically
    else if (this.response.status === 429) {
      // Login failed
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Token Expired ',
        confirmButtonText: 'OK',
      }).then(() => {
        this.servicelogin.userLogOut();
        this.route.navigateByUrl('login');
      });
    } else if (this.response.status === 432) {
      // Login failed
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: ' Failed to Login.  Invalid credentials',
        confirmButtonText: 'OK',
      }).then(() => {
        this.servicelogin.userLogOut();
        this.route.navigateByUrl('login');
      });
    }
  }

  togglePasswordVisibility() {
    const passwordinputtype = document
      .querySelector('.password')!
      .getAttribute('type');
    const passimg = document.querySelector('.passwordshowbtn')!;
    const passwordinput = document.querySelector('.password')!;

    if (passwordinputtype == 'password') {
      passimg.innerHTML =
        "<img src='" +
        this.siteURL +
        "assets/images/view_password_img.png' height='40px' alt='view'>";
      passwordinput.setAttribute('type', 'text');
    } else {
      passimg.innerHTML =
        "<img src='" +
        this.siteURL +
        "assets/images/hide_password_img.png' height='40px' alt='hide'>";

      passwordinput.setAttribute('type', 'password');
    }
  }

  //generate captcha
  generateCaptcha() {
    this.servicelogin.generateCaptcha().subscribe((data: Captcha) => {
      this.captcha = data;
    });
  }
}
