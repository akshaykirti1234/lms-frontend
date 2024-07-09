import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  //Update Password
  public updatePassword(passwordPayload: any): Observable<any> {
    return this.http.post(this.apiUrl + "updatePassword", passwordPayload, { observe: 'response' });
  }

  //Get All Modules
  public getAllModules(): Observable<any> {
    return this.http.get(this.apiUrl + 'module', { observe: 'response' });
  }

  public getSubModuleByModuleId(moduleId: number): Observable<any> {
    return this.http.get(this.apiUrl + `getSubModuleByModuleId/${moduleId}`, { observe: 'response' });
  }

  public getScheduleBySubModuleId(submoduleId: any) {
    return this.http.get(this.apiUrl + 'getScheduleBySubModuleId/' + submoduleId, { observe: 'response' });
  }

  public getSessionByscheduleForId(scheduleForId: any) {
    return this.http.get(this.apiUrl + 'getSessionByScheduleId/' + scheduleForId, { observe: 'response' });
  }

  //getSessionByscheduleForIdAndUserId
  public getSessionByscheduleForIdAndUserId(scheduleForId: any, userId: any) {
    return this.http.get(this.apiUrl + 'getSessionByscheduleForIdAndUserId/' + scheduleForId + "/" + userId, { observe: 'response' });
  }

  //save userInfoForm
  public saveUserInfoForm(userInfoForm: any) {
    // console.log(userInfoForm);
    return this.http.post(this.apiUrl + 'api/userInfo/saveUserInfoForm/', userInfoForm, { observe: 'response' });
  }

  //get questionar by sessionId
  public getQuestionarBySessionId(sessionId: any) {
    return this.http.get(this.apiUrl + `api/sessionAssessment/getQuestionarBySessionId/${sessionId}`, { observe: 'response' });
  }

  //save SessionResultMaster
  public saveSessionResult(sessionResultPayload: any): Observable<any> {
    return this.http.post(this.apiUrl + "api/sessionResult/saveSessionResult/", sessionResultPayload, { observe: 'response' });
  }

  getResultStatus(userId: any) {
    return this.http.post(this.apiUrl + "api/sessionResultStatus/getSessionResult/" + `${userId}`, { observe: 'response' });
  }

  getResultStatusBySessionIdUserId(sessionId: any, userId: any) {
    return this.http.post(this.apiUrl + "api/sessionResultStatus/getSessionResultBySessionIdUserId/" + `${sessionId}/` + `${userId}`, { observe: 'response' });
  }

  //get Topic By UserId And ScheduleId
  public getTopicByUserIdAndScheduleId(userId: any, scheduleForId: any): Observable<any> {
    // console.log(userId + " " + scheduleForId);
    return this.http.get(this.apiUrl + `api/topic/getTopicByUserIdAndScheduleId/${userId}/${scheduleForId}`, { observe: 'response' });
  }

  //save user upload topic recording
  public saveRecordedTopic(formData: any): Observable<any> {
    // console.log(formData);
    return this.http.post(this.apiUrl + `api/topic/saveRecordedTopic/`, formData, { observe: 'response' });
  }


  //for final assessment
  public getQsnByScheduleId(scheduleForId: any) {
    return this.http.get(this.apiUrl + `getQuestionarByScheduleId/${scheduleForId}`, { observe: 'response' })
  }

  saveScheduleResult(givenQuestionAnswer: any) {
    return this.http.post(this.apiUrl + `api/result/saveScheduleResult`, givenQuestionAnswer, { observe: 'response' });
  }

  getFinalResultStatus(scheduleForId: any, userId: any) {
    return this.http.get(this.apiUrl + `getFinalResult/${scheduleForId}/${userId}`);
  }

  checkIfPassedTheAssessment(scheduleForId: any, userId: any) {
    return this.http.get(this.apiUrl + `getResultStatus/${scheduleForId}/${userId}`);
  }

  checkIfSessionQsnPreparedForScheduleId(scheduleForId: any): Observable<any> {
    return this.http.get(this.apiUrl + `api/sessionAssessment/check-session-questions/${scheduleForId}`);
  }
}
