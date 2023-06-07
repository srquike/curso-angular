import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-authorizer',
  templateUrl: './authorizer.component.html',
  styleUrls: ['./authorizer.component.css'],
})
export class AuthorizerComponent {
  private service: UsersService;

  @Input()
  public rol: string;

  constructor(service: UsersService) {
    this.service = service;
  }

  protected isAuthorized(): boolean {
    return this.service.getRoles() === this.rol;
  }

  protected isAuthenticated(): boolean {
    return this.service.isLoggedIn();
  }
}
