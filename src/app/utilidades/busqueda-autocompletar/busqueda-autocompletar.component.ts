import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { ActoresService } from 'src/app/actores/actores.service';
import { ISearchActor, IFormActor, IActorPelicula } from 'src/interfaces/IActor';

@Component({
  selector: 'app-busqueda-autocompletar',
  templateUrl: './busqueda-autocompletar.component.html',
  styleUrls: ['./busqueda-autocompletar.component.css'],
})
export class BusquedaAutocompletarComponent implements OnInit {
  private _service: ActoresService;

  protected _control: FormControl;
  protected _actores: IFormActor[];
  protected _actoresDefecto: IFormActor[];
  protected _columnas: string[];
  protected _searchResults: ISearchActor[];

  @Input()
  public _actoresSeleccionados: IActorPelicula[];

  @ViewChild(MatTable)
  protected _table: MatTable<any>;

  public constructor(service: ActoresService) {
    this._service = service;
    this._control = new FormControl();
    this._actores = [];
    this._actoresDefecto = this._actores;
    this._actoresSeleccionados = [];
    this._searchResults = [];
    this._columnas = ['foto', 'nombre', 'personaje', 'acciones'];
  }

  ngOnInit(): void {
    this._control.valueChanges.subscribe((valor) => {
      if (valor !== '') {
        this._service.getByName(valor).subscribe({
          next: (results) => (this._searchResults = results),
          error: (error) => console.log(error),
        });
      }
    });
  }

  onOptionSelected(e: MatAutocompleteSelectedEvent): void {
    let starSelected = <ISearchActor>e.option.value;
    this._actoresSeleccionados.push(<IActorPelicula>{
      starId: starSelected.id,
      starName: starSelected.name,
      photographyUrl: starSelected.photographyUrl
    });
    this._control.patchValue('');

    if (this._table !== undefined) {
      this._table.renderRows();
    }
  }

  eliminarSeleccion(actor: IFormActor): void {
    const i = this._actoresSeleccionados.findIndex(
      (a) => a.starName === actor.name
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
