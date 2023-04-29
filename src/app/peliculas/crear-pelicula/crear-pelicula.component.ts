import { Component } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent {

  crearPelicula(pelicula: IPelicula): void {
    console.log(pelicula);
  }
}
