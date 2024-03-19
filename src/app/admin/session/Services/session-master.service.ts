import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionMasterService {

  constructor(private http: HttpClient) { }

  saveSession(sessionData: any) {
    return this.http.post('http://localhost:8085/session-master', sessionData);
  }

  getAllSubModule() {
    return this.http.get('http://localhost:8085/api/schedule/getAllSubModules');
  }

  getSchListById(id: any) {
    return this.http.get('http://localhost:8085/submodule/' + id);
  }

  setTempFile(fileData: any) {
    return this.http.post('http://localhost:8085/setTempFile', fileData);
  }

  getAllSessionList() {
    return this.http.get('http://localhost:8085/session-master');
  }

  deleteSession(id: any) {
    return this.http.delete('http://localhost:8085/session-master/' + id);
  }

  getSessionById(id: any) {
    return this.http.get('http://localhost:8085/session-master/' + id);
  }

  checkIsLastSession(selectedscheduleForId: number) {
    return this.http.get('http://localhost:8085/check-is-last-session/' + selectedscheduleForId);
  }

}
