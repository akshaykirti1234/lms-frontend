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

}
