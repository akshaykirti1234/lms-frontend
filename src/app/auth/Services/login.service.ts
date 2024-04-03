import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Captcha } from 'src/app/captcha';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  //private baseUrl = "http://localhost:8085/api/login/"

  //constructor(private http: HttpClient) { }

  //login validate
  // public validateLogin(user: any): Observable<any> {
  //   return this.http.post(this.baseUrl + "loginValidate", user, { observe: 'response' });
  // }

  private headers: HttpHeaders;

  constructor(private httpclient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  result: any;
  tokan: any;
  fullName: any;
  userId: any;
  respones: any;

  //loginurl = environment.serviceURL;

  // headers = {
  //     'Content-Type': 'application/json',
  //     'Encrypted': 'true' // Add a custom header to indicate encrypted request
  //   };

  // public getCurrentUser() {
  //   return this.httpclient.get(environment.serviceURL + `api/users/current-user`)
  // }

  //generate Tokan
  generateTookan(encryptedPayload: string): Observable<any> {
    return this.httpclient.post('http://localhost:8085/' + `auth/generate-token`, encryptedPayload, {
      responseType: 'text' as 'json',
      headers: this.headers
    });
  }


  //Login User (Generate Tookan)
  loginUser(tokan: any) {
    sessionStorage.setItem('tokan', tokan);
    return true;
  }



  //user logout
  userLogOut() {
    sessionStorage.clear()
    return true;
  }

  //user login or not stay
  loginstayUser() {
    let tokan = sessionStorage.getItem('tokan');
    if (tokan == undefined || tokan == null || tokan === '') {
      return false;
    } else {
      return true;
    }
  }

  //generate captcha
  // generateCaptcha(): Observable<Captcha> {
  //   return this.httpclient.get<Captcha>(environment.serviceURL+`landAppregistratation/generate`);
  // }
  generateCaptcha(): Observable<any> {
    const url = 'http://localhost:8085/commonCaptchaGenerator/generate';

    return this.httpclient.get<Captcha>(url).pipe(
      //retry(3),
      catchError((error: any) => {

        return "Something Went Wrong.";
      })
    );
  }


  // Use Token in HTTP Headers for Authorization
  getAuthorizedHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('tokan');
    if (token) {
      return this.headers.set('Authorization', `Bearer ${token}`);
    } else {
      return this.headers;
    }
  }


  // getAuthReq1Data(): Observable<any> {
  //   const url = `${environment.serviceURL}landAppregistratation/authreq1`;
  //   const headersWithToken = this.getAuthorizedHeaders(); // Use this function to get headers with token
  //   return this.httpclient.get<any>(url, { headers: headersWithToken });
  // }

  checkEmail(email : any){
    return this.httpclient.get('http://localhost:8085/auth/checkEmail/'+email);
  }

  verifyOtp(formData :any) {
    return this.httpclient.post('http://localhost:8085/auth/verify-otp' , formData);
  }

  changePassword(formData :any){
    return this.httpclient.post('http://localhost:8085/auth/change-password' , formData);
  }


}
