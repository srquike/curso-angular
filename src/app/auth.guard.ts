import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  private router: Router;
  private service: UsersService;

  public constructor(router: Router, service: UsersService) {
    this.router = router;
    this.service = service;
  }

  public isLoggedIn(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return (
      this.service.isLoggedIn() || this.router.createUrlTree(['/users/login'])
    );
  }
}

export const IsLoggedIn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  return inject(AuthGuard).isLoggedIn(next, state);
};
