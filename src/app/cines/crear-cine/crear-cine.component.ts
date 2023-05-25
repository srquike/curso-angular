import { Component } from '@angular/core';
import { IFormCinema } from 'src/interfaces/ICine';
import { CinemasService } from '../cinemas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css'],
})
export class CrearCineComponent {
  private _service: CinemasService;
  private _router: Router;

  public constructor(router: Router, service: CinemasService) {
    this._service = service;
    this._router = router;
  }

  createCinema(cinema: IFormCinema): void {
    this._service.crearCinema(cinema).subscribe({
      next: (createdCinemaId) => {
        console.log(createdCinemaId);
        this._router.navigate(['/cines']);
      },
      error: (error) => console.log(error),
    });
  }
}
