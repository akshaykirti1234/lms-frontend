import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorServiceService {
  private authorUrl = "http://localhost:8085/author";



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
