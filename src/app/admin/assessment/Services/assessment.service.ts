import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  private scheduleUrl="http://localhost:8085/";

  private scheduleSesUrl="http://localhost:8085/api/sessionAssessment/";
  

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

  // for session

  saveAssessmentSession(assessment:any):Observable<any>{
    return this.httpClient.post(this.scheduleSesUrl+"assessmentSessionSave",assessment);
  }

  viewSessionAssessment():Observable<any>{
    return this.httpClient.get(this.scheduleSesUrl+"viewAssessmentForSession");
  }

  deleteAssSession(id:any):Observable<any>{
    console.log(id);
    
    return this.httpClient.delete(this.scheduleSesUrl+`deleteAssSession/${id}`);
  }
  editAssessmentSession(id:any):Observable<any>{
    return this.httpClient.get(this.scheduleSesUrl+`editAssessmentSession/${id}`);
  }

// for session upload
  
  downloadSessionExcel() {

    return this.httpClient.get("http://localhost:8085/downloadExcelSessionQuestions", { responseType: 'blob' })


  }

  importSessionExcel(formData: any) {

    return this.httpClient.post("http://localhost:8085/uploadSessionExcel", formData, { responseType: 'text' })

  }

  // for schedule excel
  downloadScheduleExcel() {

    return this.httpClient.get("http://localhost:8085/downloadExcelmoduleQuestions", { responseType: 'blob' })


  }

  importScheduleExcel(formData: any) {

    return this.httpClient.post("http://localhost:8085/uploadModuleExcel", formData, { responseType: 'text' })

  }


}

