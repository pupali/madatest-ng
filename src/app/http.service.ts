import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public ARTICLES_URL: String = 'http://localhost:4400/api/';
  public SEARCH_URL: String = 'http://localhost:4400/api/search/';
  public TOTAL_COUNT = 'http://localhost:4400/api/totalArticles';

  constructor(private http: HttpClient) { }

  public getArticles(id): Observable<any>  {
    return this.http.get(this.ARTICLES_URL + id);
  }

  public getMatchedArticles(searchTerm): Observable<any> {
    return this.http.get(this.SEARCH_URL + searchTerm);

  }

  public getTotalArticles(): Observable<any> {
    return this.http.get(this.TOTAL_COUNT);
  }
}
