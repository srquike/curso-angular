import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IFormularioPelicula,
  IMovieForEditing,
  IMovieLandigPage,
  IMovieResources,
  IPelicula,
  IPeliculaDetails,
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

  public delete(id: number): Observable<number> {
    return this._http.delete<number>(this._apiUrl + '/' + id);
  }

  public get(values: any): Observable<HttpResponse<IPelicula[]>> {
    const params = new HttpParams({fromObject: values});
    return this._http.get<IPelicula[]>(this._apiUrl, {params: params, observe: 'response'});
  }

  public getLandingPageResources(): Observable<IMovieLandigPage> {
    return this._http.get<IMovieLandigPage>(this._apiUrl + '/' + 'landing');
  }

  public obtenerPeliculas(): Observable<IPelicula[]> {
    return this._http.get<IPelicula[]>(this._apiUrl);
  }

  public crearPelicula(pelicula: IFormularioPelicula): Observable<number> {
    const formData = this.builFormData(pelicula);
    return this._http.post<number>(this._apiUrl, formData);
  }
  
  public edit(movie: IFormularioPelicula, id: number): Observable<number> {
    const formData = this.builFormData(movie);
    return this._http.put<number>(this._apiUrl + '/' + id, formData);
  }

  public getById(id: number): Observable<IPeliculaDetails> {
    return this._http.get<IPeliculaDetails>(this._apiUrl + '/' + id);
  }

  private builFormData(movie: IFormularioPelicula): FormData {
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('releaseDate', movie.releaseDate.toDateString());
    formData.append('posterFile', movie.posterFile);
    formData.append('trailerUrl', movie.trailerUrl);
    formData.append('mpaaRating', movie.mpaaRating);
    formData.append('casting', JSON.stringify(movie.cast));
    formData.append('genres', JSON.stringify(movie.genres));
    formData.append('cinemas', JSON.stringify(movie.cinemas));
    return formData;
  }

  public getResources(): Observable<IMovieResources> {
    return this._http.get<IMovieResources>(this._apiUrl + '/resources');
  }

  public getForEditing(id: number): Observable<IMovieForEditing> {
    return this._http.get<IMovieForEditing>(this._apiUrl + '/edit/' + id);
  }
}
