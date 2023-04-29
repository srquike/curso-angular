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
      { id: 1, nombre: 'Accion' },
      { id: 2, nombre: 'Drama' },
      { id: 3, nombre: 'Comedia' },
    ];

    this.peliculas = [
      { 
        nombre: 'Spider-Man: No Way Home',
        esEnCines: true,
        esProximoEstreno: false,
        fechaEstreno: new Date(),
        poster: 'https://th.bing.com/th/id/OIP.ibW3TZfXdpRsgQKgKqctzgAAAA?pid=ImgDet&w=360&h=450&rs=1',
        recaudacion: 1584512.5,
        generos: [1]
      },
      { 
        nombre: 'Moana',
        esEnCines: false,
        esProximoEstreno: true,
        fechaEstreno: new Date('2023-05-21'),
        poster: 'https://th.bing.com/th/id/OIP.o0qhdzRqGMeKevpALPUvxwAAAA?pid=ImgDet&rs=1',
        recaudacion: 658.5,
        generos: [2]
      },
      { 
        nombre: 'Inception',
        esEnCines: true,
        esProximoEstreno: false,
        fechaEstreno: new Date('2023-05-21'),
        poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
        recaudacion: 658.5,
        generos: [3]
      }
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
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(p => p.nombre.indexOf(valores.titulo) !== -1);
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(p => p.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.esProximoEstreno) {
      this.peliculas = this.peliculas.filter(p => p.esProximoEstreno);
    }
    
    if (valores.esEnCines) {
      this.peliculas = this.peliculas.filter(p => p.esEnCines);
    }
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