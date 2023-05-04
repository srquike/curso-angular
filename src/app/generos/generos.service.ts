import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IGenero } from 'src/interfaces/IGenero';

@Injectable({
  providedIn: 'root',
})
export class GenerosService {
  private _http: HttpClient;
  private _apiUrl: string = environment.apiUrl + 'Genres';

  public constructor(http: HttpClient) {
    this._http = http;
  }

  public obtenerGeneros(itemsToDisplay: number, pageNumber: number): Observable<HttpResponse<IGenero[]>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('itemsToDisplay', itemsToDisplay.toString());
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    return this._http.get<IGenero[]>(this._apiUrl, { observe: 'response', params: httpParams });
  }

  public crearGenero(genero: IGenero): Observable<number> {
    return this._http.post<number>(this._apiUrl, genero);
  }

  public getGenreById(genreId: number): Observable<IGenero> {
    return this._http.get<IGenero>(this._apiUrl + '/' + genreId)
  }

  public editGenre(genre: IGenero, genreId: number): Observable<any> {
    return this._http.put(this._apiUrl + '/' + genreId, genre);
  }

  public deleteGenre(genreId: number): Observable<any> {
    return this._http.delete(this._apiUrl + '/' + genreId);
  }
}
