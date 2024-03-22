import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  private baseUrl = "http://localhost:8085/api/notify/"

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllUsers", { observe: 'response' });
  }

  public submitNotifyForm(payload: any): Observable<any> {
    return this.http.post(this.baseUrl + "send", payload, { observe: 'response' });
  }


  // ====================================================

  getEmailList() {
    return this.http.get("http://localhost:8085/emailId");
  }

  saveUserMaster(usermaster: any) {
    return this.http.post("http://localhost:8085/userMaster", usermaster);
  }

  getlocationList() {
    return this.http.get("http://localhost:8085/viewLocation");
  }

  getUsersList() {
    return this.http.get("http://localhost:8085/userMaster");
  }

  deleteUserById(id: any) {
    return this.http.delete(`http://localhost:8085/userMaster/${id}`);
  }

  getUserById(id: any) {
    return this.http.get(`http://localhost:8085/userMaster/${id}`);
  }


  downloadExcel() {

    return this.http.get("http://localhost:8085/generate-excel", { responseType: 'blob' })

    // .pipe(

    //   catchError(error => {

    //     console.error('Error downloading Excel:', error);

    //     return throwError(error);

    //   })

    // );

  }




  importExcel(formData: any) {

    return this.http.post("http://localhost:8085/upload", formData, { responseType: 'text' })

  }

}
