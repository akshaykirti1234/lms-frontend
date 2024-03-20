import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private SaveLocationUrl = 'http://localhost:8085/saveLocation';

  private viewLocationUrl = 'http://localhost:8085/viewLocation';

  private deleteLocationUrl = 'http://localhost:8085/deleteLocation/';

  private editLocationUrl = 'http://localhost:8085/editLocation/';

  constructor(private httpClient: HttpClient) { }

  saveLocation(sub: any): Observable<any> {
    return this.httpClient.post(this.SaveLocationUrl, sub);
  }

  viewLocationDetails() {
    return this.httpClient.get<any[]>(this.viewLocationUrl);
  }

  deleteLocation(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.deleteLocationUrl}${id}`);
  }

  editLoc(id: any) {
    return this.httpClient.get(this.editLocationUrl + id);
  }
}
