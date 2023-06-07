import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private userService: UsersService;

  constructor(userService: UsersService) {
    this.userService = userService;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userService.getJwt();

    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: { Authorization: `bearer ${token}` },
    });

    return next.handle(authReq);
  }
}
