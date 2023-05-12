import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICine } from 'src/interfaces/ICine';

@Injectable({
  providedIn: 'root',
})
export class CinemasService {
  private _http: HttpClient;
  private _apiUrl: string = environment.apiUrl + 'Cinemas';

  public constructor(http: HttpClient) {
    this._http = http;
  }

  public crearCinema(cinema: ICine): Observable<number> {
    return this._http.post<number>(this._apiUrl, cinema);
  }

  public obtenerCinemas(itemsToDisplay: number, pageNumber: number): Observable<HttpResponse<ICine[]>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('itemsToDisplay', itemsToDisplay.toString());
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    return this._http.get<ICine[]>(this._apiUrl, { observe: 'response', params: httpParams });
  }

  public deleteCinema(cinemaId: number): Observable<any> {
    return this._http.delete(this._apiUrl + '/' + cinemaId);
  }
}
