import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IFormActor, ISearchActor } from 'src/interfaces/IActor';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  private _http: HttpClient;
  private _apiUrl: string = environment.apiUrl + 'Stars';

  constructor(http: HttpClient) {
    this._http = http;
  }

  public getStars(
    itemsToDisplay: number,
    pageNumber: number
  ): Observable<HttpResponse<IFormActor[]>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('itemsToDisplay', itemsToDisplay.toString());
    httpParams = httpParams.append('pageNumber', pageNumber.toString());
    return this._http.get<IFormActor[]>(this._apiUrl, {
      observe: 'response',
      params: httpParams,
    });
  }

  public getByName(name: string): Observable<ISearchActor[]> {
    return this._http.get<ISearchActor[]>(this._apiUrl + '/' + name);
  }

  public createStar(star: IFormActor): Observable<number> {
    const starFormData = this.builFormData(star);
    return this._http.post<number>(this._apiUrl, starFormData);
  }

  private builFormData(star: IFormActor): FormData {
    const formData = new FormData();
    formData.append('name', star.name);
    formData.append('dateOfBirth', (star.dateOfBirth as Date).toISOString());
    formData.append('photographyFile', star.photographyUrl);

    return formData;
  }

  public deleteStar(starId: number): Observable<any> {
    return this._http.delete(this._apiUrl + '/' + starId);
  }

  public getStarById(starId: number): Observable<IFormActor> {
    return this._http.get<IFormActor>(this._apiUrl + '/' + starId);
  }

  public editStar(star: IFormActor, starId: number): Observable<any> {
    const starFormData = this.builFormData(star);
    return this._http.put(this._apiUrl + '/' + starId, starFormData);
  }
}
