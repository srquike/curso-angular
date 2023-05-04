import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGenero } from 'src/interfaces/IGenero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css'],
})
export class CrearGeneroComponent {
  private _service: GenerosService;
  private _router: Router;

  constructor(router: Router, service: GenerosService) {
    this._router = router;
    this._service = service;
  }

  guardar(genero: IGenero): void {
    this._service.crearGenero(genero).subscribe({
      next: (resultado) => {
        console.log(resultado);
        this._router.navigate(['/generos']);
      },
      error: (error) => console.log(error),
    });
  }
}
