import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModuleserviceService {
  constructor(private httpClient: HttpClient) { }

  getModuleDetails() {
    return this.httpClient.get('http://localhost:8085/module');
  }

  saveModuleDetails(moduleDetails: any) {
    return this.httpClient.post('http://localhost:8085/module', moduleDetails);
  }

  setFilePath(file: any) {
    return this.httpClient.post('http://localhost:8085/setlogo', file);
  }

  deleteModule(moduleId: any) {
    return this.httpClient.delete('http://localhost:8085/module/' + moduleId);
  }

  getModuleById(moduleId: any) {
    return this.httpClient.get('http://localhost:8085/module/' + moduleId);
  }
}
