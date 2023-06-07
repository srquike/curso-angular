import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ILoginUser } from 'src/interfaces/IUsers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private service: UsersService;
  private router: Router;

  protected form: FormGroup;

  constructor(service: UsersService, router: Router) {
    this.service = service;
    this.router = router;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  logIn() {
    this.service.logIn(<ILoginUser>this.form.value).subscribe({
      next: (response) => {
        this.service.saveToken(response);
        this.router.navigate(['/']);
      },
      error: (errors) => console.log(errors),
    });
  }
}
