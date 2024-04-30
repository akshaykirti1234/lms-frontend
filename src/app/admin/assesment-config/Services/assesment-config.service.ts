import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssesmentConfigService {

  constructor(private http: HttpClient) { }

  //schedule service config

  saveAssesmentSetting(formData: any) {
    return this.http.post('http://localhost:8085/assessmentSetting', formData);
  }

  getAllScheduleConfigList() {
    return this.http.get('http://localhost:8085/assessmentSetting');
  }

  getSchConfigById(id: any) {
    return this.http.get("http://localhost:8085/assessmentSetting/" + id);
  }

  updateSchConfig(id : any , formData : any){
    return this.http.put(`http://localhost:8085/assessmentSetting/${id}` , formData);
  }

  deleteSchConfig(id : any){
    return this.http.delete("http://localhost:8085/assessmentSetting/" + id);
  }


  //session config service

  saveAssessmentSessionSetting(formData: any) {
    return this.http.post('http://localhost:8085/sessionAssessmentSetting', formData);
  }

  getAllSessionConfigList() {
    return this.http.get('http://localhost:8085/sessionAssessmentSetting');
  }

  getSessionConfigById(id: any) {
    return this.http.get("http://localhost:8085/sessionAssessmentSetting/" + id);
  }

  updateSessConfig(id : any, formData : any){
    return this.http.put(`http://localhost:8085/sessionAssessmentSetting/${id}`,formData);
  }

  deleteSessConfig(id : any){
    return this.http.delete("http://localhost:8085/sessionAssessmentSetting/" + id);
  }
}
