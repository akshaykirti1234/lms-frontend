import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorServiceService {
  private apiUrl = environment.apiUrl;
  private authorUrl = this.apiUrl + "author";



  constructor(private httpClient: HttpClient) { }

  saveAuthor(author: any): Observable<any> {
    return this.httpClient.post(this.authorUrl, author);
  }
  viewAuthor(): Observable<any> {
    return this.httpClient.get(this.authorUrl)
  }

  deleteAuthor(id: any): Observable<any> {
    return this.httpClient.delete(this.authorUrl + `/${id}`)
  }

  editAuthor(id: any): Observable<any> {
    return this.httpClient.get(this.authorUrl + `/${id}`)

  }

}
