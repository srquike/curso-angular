import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private http: HttpClient;
  private apiUrl: string = environment.apiUrl + 'Ratings';

  constructor(http: HttpClient) {
    this.http = http;
  }

  public create(movieId: number, scoring: number): Observable<void> {
    return this.http.post<void>(this.apiUrl, { movieId, scoring });
  }
}
