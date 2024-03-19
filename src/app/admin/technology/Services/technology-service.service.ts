import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyServiceService {
  private techUrl="http://localhost:8085/"

  constructor(private httpClint:HttpClient) { }

  saveTechnology(tech:any):Observable<any>{
    return this.httpClint.post(this.techUrl+"technology",tech)
  }

  viewTechnology():Observable<any> {
    return this.httpClint.get(this.techUrl + "alltechnology")
  }

  deleteTechnology(id:any):Observable<any> {
    return this.httpClint.delete(this.techUrl +`deleteTech/${id}`);
  }
 
  editTechnology(id:any):Observable<any>{
    return this.httpClint.get(this.techUrl+`editTech/${id}`)
  }
}
