import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private apiUrl = environment.apiUrl;

  private SaveLocationUrl = this.apiUrl + 'saveLocation';

  private viewLocationUrl = this.apiUrl + 'viewLocation';

  private deleteLocationUrl = this.apiUrl + 'deleteLocation/';

  private editLocationUrl = this.apiUrl + 'editLocation/';

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
