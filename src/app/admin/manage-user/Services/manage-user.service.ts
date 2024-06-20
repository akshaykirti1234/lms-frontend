import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  private baseUrl = environment.apiUrl+"api/notify/"

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllUsers", { observe: 'response' });
  }

  public submitNotifyForm(payload: any): Observable<any> {
    return this.http.post(this.baseUrl + "send", payload, { observe: 'response' });
  }


  // ====================================================

  getEmailList() {
    return this.http.get(environment.apiUrl+"emailId");
  }

  saveUserMaster(usermaster: any) {
    return this.http.post(environment.apiUrl+"userMaster", usermaster);
  }

  getlocationList() {
    return this.http.get(environment.apiUrl+"viewLocation");
  }

  getUsersList() {
    return this.http.get(environment.apiUrl+"userMaster");
  }

  deleteUserById(id: any) {
    return this.http.delete(`${environment.apiUrl}userMaster/${id}`);
  }

  getUserById(id: any) {
    return this.http.get(`${environment.apiUrl}userMaster/${id}`);
  }


  downloadExcel() {

    return this.http.get(environment.apiUrl+"generate-excel", { responseType: 'blob' })

    // .pipe(

    //   catchError(error => {

    //     console.error('Error downloading Excel:', error);

    //     return throwError(error);

    //   })

    // );

  }




  importExcel(formData: any) {

    return this.http.post(environment.apiUrl+"upload", formData, { responseType: 'text' })

  }

}
