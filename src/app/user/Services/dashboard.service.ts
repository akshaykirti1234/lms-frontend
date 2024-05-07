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

  //Get All Modules
  public getAllModules(): Observable<any> {
    return this.http.get(this.baseUrl + 'module', { observe: 'response' });
  }

  public getSubModuleByModuleId(moduleId: number): Observable<any> {
    return this.http.get(this.baseUrl + `getSubModuleByModuleId/${moduleId}`, { observe: 'response' });
  }

  public getScheduleBySubModuleId(submoduleId: any) {
    return this.http.get('http://localhost:8085/getScheduleBySubModuleId/' + submoduleId, { observe: 'response' });
  }

  public getSessionByscheduleForId(scheduleForId: any) {
    return this.http.get('http://localhost:8085/getSessionByScheduleId/' + scheduleForId, { observe: 'response' });
  }

  //getSessionByscheduleForIdAndUserId
  public getSessionByscheduleForIdAndUserId(scheduleForId: any, userId: any) {
    return this.http.get('http://localhost:8085/getSessionByscheduleForIdAndUserId/' + scheduleForId + "/" + userId, { observe: 'response' });
  }

  //save userInfoForm
  public saveUserInfoForm(userInfoForm: any) {
    console.log(userInfoForm);
    return this.http.post('http://localhost:8085/api/userInfo/saveUserInfoForm/', userInfoForm, { observe: 'response' });
  }

  //get questionar by sessionId
  public getQuestionarBySessionId(sessionId: any) {
    return this.http.get(`http://localhost:8085/api/sessionAssessment/getQuestionarBySessionId/${sessionId}`, { observe: 'response' });
  }

  //save SessionResultMaster
  public saveSessionResult(sessionResultPayload: any): Observable<any> {
    return this.http.post("http://localhost:8085/api/sessionResult/saveSessionResult/", sessionResultPayload, { observe: 'response' });
  }

  getResultStatus(userId: any) {
    return this.http.post("http://localhost:8085/api/sessionResultStatus/getSessionResult/" + `${userId}`, { observe: 'response' });
  }

  getResultStatusBySessionIdUserId(sessionId: any, userId: any) {
    return this.http.post("http://localhost:8085/api/sessionResultStatus/getSessionResultBySessionIdUserId/" + `${sessionId}/` + `${userId}`, { observe: 'response' });
  }

}
