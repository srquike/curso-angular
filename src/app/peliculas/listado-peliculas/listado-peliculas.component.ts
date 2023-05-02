import { Component, Input, OnInit } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent implements OnInit {
  @Input()
  peliculas!: IPelicula[];

  private _service: PeliculasService;

  public constructor(service: PeliculasService) {
    this._service = service;
  }

  ngOnInit(): void {
    this._service.obtenerPeliculas().subscribe({
      next: (result) => (this.peliculas = result),
      error: (error) => console.log(error),
    });
  }

  eliminarPelicula(indice: number): void {
    this.peliculas.splice(indice, 1);
  }
}
