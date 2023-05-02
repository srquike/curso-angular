import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IPelicula } from 'src/interfaces/IPelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {

  private _http: HttpClient
  private _apiUrl: string = environment.apiUrl;

  constructor(http: HttpClient) {
    this._http = http;
  }

  public obtenerPeliculas(): Observable<IPelicula[]> {
    return this._http.get<IPelicula[]>(this._apiUrl + 'Movies');
  }
}
