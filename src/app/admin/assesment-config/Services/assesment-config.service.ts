import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssesmentConfigService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //schedule service config

  getScheduleForSchConfig(subModule: any) {
    return this.http.get(`${this.apiUrl}scheduleForAssessmentSetting/${subModule}`);
  }

  saveAssesmentSetting(formData: any) {
    return this.http.post(`${this.apiUrl}assessmentSetting`, formData);
  }

  getAllScheduleConfigList() {
    return this.http.get(`${this.apiUrl}assessmentSetting`);
  }

  getSchConfigById(id: any) {
    return this.http.get(`${this.apiUrl}assessmentSetting/` + id);
  }

  updateSchConfig(id: any, formData: any) {
    return this.http.put(`${this.apiUrl}assessmentSetting/${id}`, formData);
  }

  deleteSchConfig(id: any) {
    return this.http.delete(`${this.apiUrl}assessmentSetting/` + id);
  }


  //session config service

  getSessionForSessionConfig(scheduleForId: any) {
    return this.http.get(`${this.apiUrl}sessionForAssessmentSetting/${scheduleForId}`);
  }

  saveAssessmentSessionSetting(formData: any) {
    return this.http.post(`${this.apiUrl}sessionAssessmentSetting`, formData);
  }

  getAllSessionConfigList() {
    return this.http.get(`${this.apiUrl}sessionAssessmentSetting`);
  }

  getSessionConfigById(id: any) {
    return this.http.get(`${this.apiUrl}sessionAssessmentSetting/` + id);
  }

  updateSessConfig(id: any, formData: any) {
    return this.http.put(`${this.apiUrl}sessionAssessmentSetting/${id}`, formData);
  }

  deleteSessConfig(id: any) {
    return this.http.delete(`${this.apiUrl}sessionAssessmentSetting/` + id);
  }
}
