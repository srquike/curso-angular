import { Component, OnInit } from '@angular/core';
import { IFormularioPelicula } from 'src/interfaces/IPelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  private _service: PeliculasService;

  public constructor(service: PeliculasService) {
    this._service = service;
  }

  ngOnInit(): void {}

  crearPelicula(pelicula: IFormularioPelicula): void {
    this._service.crearPelicula(pelicula).subscribe({
      next: (result) => window.alert(`Id de la pelicula creada: ${result}`),
      error: (error) => window.alert(error),
    });
  }
}
