import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModuleserviceService {
  constructor(private httpClient: HttpClient) { }

  getModuleDetails() {
    return this.httpClient.get(environment.apiUrl+'module');
  }

  saveModuleDetails(moduleDetails: any) {
    return this.httpClient.post(environment.apiUrl+'module', moduleDetails);
  }

  setFilePath(file: any) {
    return this.httpClient.post(environment.apiUrl+'setlogo', file);
  }

  deleteModule(moduleId: any) {
    return this.httpClient.delete(environment.apiUrl+'module/' + moduleId);
  }

  getModuleById(moduleId: any) {
    return this.httpClient.get(environment.apiUrl+'module/' + moduleId);
  }
}
