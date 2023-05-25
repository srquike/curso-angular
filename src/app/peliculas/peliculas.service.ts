import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  IFormularioPelicula,
  IMovieResources,
  IPelicula,
} from 'src/interfaces/IPelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private _http: HttpClient;
  private _apiUrl: string = environment.apiUrl + 'Movies';

  public constructor(http: HttpClient) {
    this._http = http;
  }

  public obtenerPeliculas(): Observable<IPelicula[]> {
    return this._http.get<IPelicula[]>(this._apiUrl);
  }

  public crearPelicula(pelicula: IFormularioPelicula): Observable<number> {
    const formData = this.builFormData(pelicula);
    return this._http.post<number>(this._apiUrl, formData);
  }

  private builFormData(movie: IFormularioPelicula): FormData {
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('releaseDate', movie.releaseDate.toISOString());
    formData.append('posterFile', movie.posterFile);
    formData.append('trailerUrl', movie.trailerUrl);
    formData.append('mpaaRating', movie.mpaaRating);
    formData.append('cast', JSON.stringify(movie.cast));
    formData.append('genres', JSON.stringify(movie.genres));
    formData.append('cinemas', JSON.stringify(movie.cinemas));
    return formData;
  }

  public getResources(): Observable<IMovieResources> {
    return this._http.get<IMovieResources>(this._apiUrl + '/resources');
  }
}
