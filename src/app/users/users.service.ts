import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ILoginUser, ISigninUser, ITokenUser } from 'src/interfaces/IUsers';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http: HttpClient;
  private apiUrl: string = environment.apiUrl + 'Users';
  private readonly TOKEN_KEY: string = 'token';
  private readonly TOKEN_EXPIRES: string = 'token-expires';

  constructor(http: HttpClient) {
    this.http = http;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token) {
      return false;
    }

    const expires = new Date(localStorage.getItem(this.TOKEN_EXPIRES));

    if (expires <= new Date()) {
      this.logOut();
      return false;
    }

    return true;
  }

  public getRoles(): string {
    return this.getClaimFromJwt('role');
  }

  public getClaimFromJwt(claim: string): string {
    const jwt = localStorage.getItem(this.TOKEN_KEY);

    if (!jwt) {
      return '';
    }

    const payload = JSON.parse(window.atob(jwt.split('.')[1]));

    return payload[claim];
  }

  public logIn(user: ILoginUser): Observable<ITokenUser> {
    return this.http.post<ITokenUser>(this.apiUrl + '/' + 'login', user);
  }

  public logOut(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRES);
  }

  public signIn(user: ISigninUser): Observable<ITokenUser> {
    return this.http.post<ITokenUser>(this.apiUrl + '/' + 'signin', user);
  }

  public saveToken(token: ITokenUser): void {
    localStorage.setItem(this.TOKEN_KEY, token.token);
    localStorage.setItem(this.TOKEN_EXPIRES, token.expiration.toString());
  }

  public getJwt(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
