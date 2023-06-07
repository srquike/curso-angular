import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  private service: UsersService;

  constructor(service: UsersService) {
    this.service = service;
  }

  protected getUserName(): string {
    return this.service.getClaimFromJwt('name');
  }

  protected logOut(): void {
    this.service.logOut();
  }

}
