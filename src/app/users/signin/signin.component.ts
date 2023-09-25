import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISigninUser } from 'src/interfaces/IUsers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  private service: UsersService;
  private router: Router;

  protected form: FormGroup;

  constructor(service: UsersService, router: Router) {
    this.service = service;
    this.router = router;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  signIn() {
    // this.service.signIn(<ISigninUser>this.form.value).subscribe({
    //   next: (response) => {
    //     this.service.saveToken(response);
    //     this.router.navigate(['/']);
    //   },
    //   error: (errors) => console.log(errors),
    // });
  }
}
