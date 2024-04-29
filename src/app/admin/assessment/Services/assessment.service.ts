import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private scheduleUrl="http://localhost:8085/";
  

  constructor(private httpClient:HttpClient) { }

  // getAllScheduleName(){
  //   return this.httpClient.get(this.scheduleUrl+"getAllScheduleNames");
  // }

  getScheduleBySessionId(id: any) {
    return this.httpClient.get('http://localhost:8085/session-master/',id);
  }
  saveAssessment(assessment:any):Observable<any>{
    return this.httpClient.post(this.scheduleUrl+"assessmentSave",assessment);
  }

  viewAssessment():Observable<any>{
    return this.httpClient.get(this.scheduleUrl+"viewAssessment");
  }

  editAssessment(id:any):Observable<any>{
    return this.httpClient.get(this.scheduleUrl+`edit/${id}`);
  }

  deleteAssessment(id:any):Observable<any>{
    console.log(id);
    
    return this.httpClient.delete(this.scheduleUrl+`delete/${id}`);
  }

}

