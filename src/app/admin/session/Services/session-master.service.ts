import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionMasterService {

  constructor(private http: HttpClient) { }

  saveSession(sessionData: any) {
    return this.http.post(environment.apiUrl+'session-master', sessionData);
  }

  getAllSubModule() {
    return this.http.get(environment.apiUrl+'api/schedule/getAllSubModules');
  }

  getSchListById(id: any) {
    return this.http.get(environment.apiUrl+'submodule/' + id);
  }

  setTempFile(fileData: any) {
    return this.http.post(environment.apiUrl+'setTempFile', fileData);
  }

  getAllSessionList() {
    return this.http.get(environment.apiUrl+'session-master');
  }

  deleteSession(id: any) {
    return this.http.delete(environment.apiUrl+'session-master/' + id);
  }

  getSessionById(id: any) {
    return this.http.get(environment.apiUrl+'session-master/' + id);
  }

  checkIsLastSession(selectedscheduleForId: number) {
    return this.http.get(environment.apiUrl+'check-is-last-session/' + selectedscheduleForId);
  }

}
