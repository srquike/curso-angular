import { Component, Input, OnInit } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  ngOnInit(): void {
    this.modelo = {
      nombre: 'Spider-Man: No Way Home',
      esEnCines: true,
      esProximoEstreno: false,
      fechaEstreno: new Date(),
      generos: [1, 2],
      poster: '',
      recaudacion: 12354.5
    }
  }


  protected modelo: IPelicula;

  protected editarPelicula(pelicula: IPelicula): void {
    
  }
}
