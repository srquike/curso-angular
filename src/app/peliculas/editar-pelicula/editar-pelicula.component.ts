import { Component, Input, OnInit } from '@angular/core';
import { IFormularioPelicula, IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  ngOnInit(): void {
  }


  protected modelo: IPelicula;

  protected editarPelicula(pelicula: IFormularioPelicula): void {
    
  }
}
