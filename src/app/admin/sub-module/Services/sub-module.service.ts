import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubModuleService {
  induction: any;

  private ModuleListUrl = 'http://localhost:8085/moduleList';

  private SaveSubModuleUrl = 'http://localhost:8085/saveSubModule';

  private viewSubModuleUrl = 'http://localhost:8085/viewSubModule';

  private deleteSubModuleUrl = 'http://localhost:8085/delete/';

  private editSubmoduleUrl = 'http://localhost:8085/editSubModule/';

  constructor(private httpClient: HttpClient) { }

  edit(id: any) {
    return this.httpClient.get(this.editSubmoduleUrl + id);
  }

  getModuleList() {
    return this.httpClient.get(`${this.ModuleListUrl}`);
  }

  saveSubModule(sub: any): Observable<any> {
    return this.httpClient.post(this.SaveSubModuleUrl, sub);
  }

  viewSubModuleDetails() {
    return this.httpClient.get<any[]>(this.viewSubModuleUrl);
  }

  deleteSubModule(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.deleteSubModuleUrl}${id}`);
  }
}
