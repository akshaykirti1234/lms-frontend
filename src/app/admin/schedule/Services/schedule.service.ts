import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private baseUrl = environment.apiUrl+"api/schedule/"

  constructor(private http: HttpClient) { }

  //get all Schedule Form
  public getAllScheduleForm(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllScheduleForm", { observe: 'response' });
  }

  //get submoduleList
  public getAllSubModules(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllSubModules", { observe: 'response' });
  }

  //get Authors List
  public getAllAutohors(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllAutohors", { observe: 'response' });
  }

  //get Technology List
  public getAllTechnologies(): Observable<any> {
    return this.http.get(this.baseUrl + "getAllTechnologies", { observe: 'response' });
  }

  //save scheduleForm
  public saveScheduleForm(scheduleForm: any): Observable<any> {
    return this.http.post(this.baseUrl + "saveScheduleForm", scheduleForm, { observe: 'response' });

  }

  //Update ScheduleFor
  public updateScheduleFor(scheduleForId: any): Observable<any> {
    return this.http.put(this.baseUrl + `updateScheduleFor/${scheduleForId}`, null, { observe: 'response' });
  }

  //Update ScheduleFor
  public deleteScheduleFor(scheduleForId: any): Observable<any> {
    return this.http.delete(this.baseUrl + `deleteScheduleFor/${scheduleForId}`, { observe: 'response' });
  }

}
