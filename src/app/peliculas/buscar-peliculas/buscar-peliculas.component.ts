import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IGenero } from 'src/interfaces/IGenero';
import { IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-buscar-peliculas',
  templateUrl: './buscar-peliculas.component.html',
  styleUrls: ['./buscar-peliculas.component.css']
})
export class BuscarPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) { 
    this.formulario = this.formBuilder.group(this.camposPorDefecto);

    this.generos = [
    ]

    this.peliculasPorDefecto = this.peliculas;
  }

  
  ngOnInit(): void {
    this.leerValoresURL();
    this.buscarPeliculas(this.formulario.value);
    this.formulario.valueChanges.subscribe(valores => {
      this.peliculas = this.peliculasPorDefecto;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaURL();
    });
  }
  
  formulario: FormGroup;
  generos: IGenero[];
  peliculas: IPelicula[];
  peliculasPorDefecto: IPelicula[];

  camposPorDefecto = {
    titulo: '',
    generoId: 0,
    esProximoEstreno: false,
    esEnCines: false
  }

  limpiarBusqueda(): void { 
    this.formulario.patchValue(this.camposPorDefecto);
  }

  escribirParametrosBusquedaURL(): void {
    let queryStrings = [];
    let valoresFormulario = this.formulario.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`)
    }
    
    if (valoresFormulario.generoId) {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`)
    }
    
    if (valoresFormulario.esProximoEstreno) {
      queryStrings.push(`esProximoEstreno=${valoresFormulario.esProximoEstreno}`)
    }
    
    if (valoresFormulario.esEnCines) {
      queryStrings.push(`esEnCines=${valoresFormulario.esEnCines}`)
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarPeliculas(valores: any): void {

  }

  leerValoresURL(): void {
    this.activatedRoute.queryParams.subscribe( params => {
      let objeto: any = {};

      if (params['titulo']) {
        objeto.titulo = params['titulo'];
      }
      
      if (params['generoId']) {
        objeto.generoId = params['generoId'];
      }
      
      if (params['esProximoEstreno']) {
        objeto.esProximoEstreno = params['esProximoEstreno'];
      }
      
      if (params['esEnCines']) {
        objeto.esEnCines = params['esEnCines'];
      }

      this.formulario.patchValue(objeto);

    });
  }
}