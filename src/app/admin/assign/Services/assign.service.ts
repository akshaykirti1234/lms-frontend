import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  private apiUrl = environment.apiUrl;

  private baseUrl = this.apiUrl + "assign/"

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
