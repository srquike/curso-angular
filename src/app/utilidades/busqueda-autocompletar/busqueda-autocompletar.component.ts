import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { IActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-busqueda-autocompletar',
  templateUrl: './busqueda-autocompletar.component.html',
  styleUrls: ['./busqueda-autocompletar.component.css'],
})
export class BusquedaAutocompletarComponent implements OnInit {
  protected _control: FormControl;
  protected _actores: IActor[];
  protected _actoresDefecto: IActor[];

  @Input()
  public _actoresSeleccionados: IActor[];
  protected _columnas: string[];

  @ViewChild(MatTable)
  protected _table: MatTable<any>;

  public constructor() {
    this._control = new FormControl();
    this._actores = [];
    this._actoresDefecto = this._actores;
    this._actoresSeleccionados = [];
    this._columnas = ['foto', 'nombre', 'personaje', 'acciones'];
  }

  ngOnInit(): void {
    this._control.valueChanges.subscribe((valor) => {
      this._actores = this._actoresDefecto;
      this._actores = this._actores.filter((a) => a.name.indexOf(valor) !== -1);
    });
  }

  onOptionSelected(e: MatAutocompleteSelectedEvent): void {
    this._actoresSeleccionados.push(e.option.value);
    this._control.patchValue('');

    if (this._table !== undefined) {
      this._table.renderRows();
    }
  }

  eliminarSeleccion(actor: IActor): void {
    const i = this._actoresSeleccionados.findIndex(
      (a) => a.name === actor.name
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
