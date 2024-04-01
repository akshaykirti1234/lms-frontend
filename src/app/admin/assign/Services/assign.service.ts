import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  private baseUrl = "http://localhost:8085/assign/"

  constructor(private http: HttpClient) { }

  //get all submodule List
  public getAllSubModules(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllSubModules", { observe: 'response' });
  }

  //get all submodule List
  public getAllScheduleForm(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllScheduleForm", { observe: 'response' });
  }

}
