import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = "http://localhost:8085/";

  constructor(private http: HttpClient) { }

  //Update Password
  public updatePassword(passwordPayload: any): Observable<any> {
    return this.http.post(this.baseUrl + "updatePassword", passwordPayload, { observe: 'response' });
  }
}
