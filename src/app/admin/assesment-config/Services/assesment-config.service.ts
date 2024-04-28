import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssesmentConfigService {

  constructor(private http : HttpClient) { }

  saveAssesmentSetting(formData : any){
    return  this.http.post('http://localhost:8085/assessmentSetting' , formData);
  }

  getAllScheduleConfigList(){
    return this.http.get('http://localhost:8085/assessmentSetting');
  }

  saveAssessmentSessionSetting(formData : any){
    return  this.http.post('http://localhost:8085/sessionAssessmentSetting' , formData);
  }

  getAllSessionConfigList(){
    return this.http.get('http://localhost:8085/sessionAssessmentSetting');
  }
}
