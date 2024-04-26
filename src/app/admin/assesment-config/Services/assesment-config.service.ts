import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssesmentConfigService {

  constructor(private http : HttpClient) { }

  saveAssesmentSetting(formData : any){
    return  this.http.post('http://localhost:8085/assessentSetting' , formData);
  }

}
