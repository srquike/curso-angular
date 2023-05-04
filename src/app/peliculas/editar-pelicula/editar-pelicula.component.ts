import { Component, Input, OnInit } from '@angular/core';
import { IFormularioPelicula, IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  ngOnInit(): void {
    this.modelo = {
      title: 'Spider-Man: No Way Home',
      releaseDate: new Date().toDateString(),
      genres: [1, 2],
      poster: '',
      cast: [],
      cinemas: [],
      mpaaRating: 'PG-13',
      trailerUrl: ''
    }
  }


  protected modelo: IPelicula;

  protected editarPelicula(pelicula: IFormularioPelicula): void {
    
  }
}
