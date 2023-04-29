import { Component, Input, OnInit } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent implements OnInit {

  @Input()
  peliculas!: IPelicula[];

  ngOnInit(): void {

  }

  eliminarPelicula(indice:number):void {
    this.peliculas.splice(indice, 1);
  }
}
