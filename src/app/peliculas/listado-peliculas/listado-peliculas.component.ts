import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from 'src/interfaces/IMovie';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent implements OnInit {

  @Input()
  movies!: IMovie[];

  ngOnInit(): void {

  }

  eliminarPelicula(indice:number):void {
    this.movies.splice(indice, 1);
  }
}
