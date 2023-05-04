import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { IEditarActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-busqueda-autocompletar',
  templateUrl: './busqueda-autocompletar.component.html',
  styleUrls: ['./busqueda-autocompletar.component.css'],
})
export class BusquedaAutocompletarComponent implements OnInit {
  protected _control: FormControl;
  protected _actores: IEditarActor[];
  protected _actoresDefecto: IEditarActor[];

  @Input()
  public _actoresSeleccionados: IEditarActor[];
  protected _columnas: string[];



  @ViewChild(MatTable)
  protected _table: MatTable<any>;

  public constructor() {
    this._control = new FormControl();
    this._actores = [
      {
        id: 1,
        nombre: 'Jonathan Vanegas',
        foto: 'https://ia.media-imdb.com/images/M/MV5BMTk1MjM3NTU5M15BMl5BanBnXkFtZTcwMTMyMjAyMg@@._V1_UY1200_CR142,0,630,1200_AL_.jpg',
        fechaNacimiento: new Date(),
        personaje: '',
      },
      {
        id: 2,
        nombre: 'Enrique Coreas',
        foto: 'https://ia.media-imdb.com/images/M/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_UY1200_CR130,0,630,1200_AL_.jpg',
        fechaNacimiento: new Date(),
        personaje: '',
      },
      {
        id: 3,
        nombre: 'Juan Manuel',
        foto: 'https://m.media-amazon.com/images/M/MV5BYzQ5Yzg1NzktMDcxNC00ZDc1LWJlMjEtNTg2ZjRlOTk4ZDNjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UY1200_CR110,0,630,1200_AL_.jpg',
        fechaNacimiento: new Date(),
        personaje: '',
      },
    ];
    this._actoresDefecto = this._actores;
    this._actoresSeleccionados = [];
    this._columnas = ['foto', 'nombre', 'personaje', 'acciones'];
  }

  ngOnInit(): void {
    this._control.valueChanges.subscribe((valor) => {
      this._actores = this._actoresDefecto;
      this._actores = this._actores.filter(
        (a) => a.nombre.indexOf(valor) !== -1
      );
    });
  }

  onOptionSelected(e: MatAutocompleteSelectedEvent): void {
    this._actoresSeleccionados.push(e.option.value);
    this._control.patchValue('');

    if (this._table !== undefined) {
      this._table.renderRows();
    }
  }

  eliminarSeleccion(actor: IEditarActor): void {
    const i = this._actoresSeleccionados.findIndex(
      (a) => a.nombre === actor.nombre
    );
    this._actoresSeleccionados.splice(i, 1);
    this._table.renderRows();
  }

  soltarFila(e: CdkDragDrop<any[]>): void {
    const indicePrevio = this._actoresSeleccionados.findIndex(
      (a) => a === e.item.data
    );

    moveItemInArray(this._actoresSeleccionados, indicePrevio, e.currentIndex);
    this._table.renderRows();
  }
}
