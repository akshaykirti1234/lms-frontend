import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubModuleService {
  induction: any;

  private ModuleListUrl = environment.apiUrl+'moduleList';

  private SaveSubModuleUrl = environment.apiUrl+'saveSubModule';

  private viewSubModuleUrl = environment.apiUrl+'viewSubModule';

  private deleteSubModuleUrl = environment.apiUrl+'delete/';

  private editSubmoduleUrl = environment.apiUrl+'editSubModule/';

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
