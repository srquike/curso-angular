import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ICharacter, IActorPelicula } from 'src/interfaces/IActor';
import { IElementoSelectorMultiple } from 'src/interfaces/IElementoSelectorMultiple';
import { IFormularioPelicula, IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {

  @ViewChild('mpaaRatings') mpaaRatings: MatSelect;

  @Input()
  public movie: IPelicula;

  @Output()
  protected _onSubmit: EventEmitter<IFormularioPelicula>;

  @Input()
  public _actoresSeleccionados: IActorPelicula[];

  @Input()
  public _generosNoSeleccionados: IElementoSelectorMultiple[];

  @Input()
  public _cinesNoSeleccionados: IElementoSelectorMultiple[];

  @Input()
  public _generosSeleccionados: IElementoSelectorMultiple[];

  @Input()
  public _cinesSeleccionados: IElementoSelectorMultiple[];

  protected _form: FormGroup;
  protected _mpaaRatings: IElementoSelectorMultiple[];

  public constructor() {
    this._onSubmit = new EventEmitter<IFormularioPelicula>();
    this._generosSeleccionados = [];
    this._cinesSeleccionados = [];
    this._actoresSeleccionados = [];
    this._form = new FormGroup({
      title: new FormControl('', Validators.required),
      releaseDate: new FormControl(''),
      trailerUrl: new FormControl(''),
      mpaaRating: new FormControl(''),
      posterFile: new FormControl(''),
      genres: new FormControl(''),
      cinemas: new FormControl(''),
      cast: new FormControl(''),
    });
    this._mpaaRatings = [
      { key: 'G', value: 'G - General Audiences' },
      { key: 'PG', value: 'PG - Parental Guidance Suggested' },
      { key: 'PG-13', value: 'PG-13 - Parents Strongly Cautioned' },
      { key: 'R', value: 'R - Restricted' },
      { key: 'NC-17', value: 'NC-17 - Adults Only' },
    ];
  }

  ngOnInit(): void {
    if (this.movie !== undefined) {
      this._form.patchValue(this.movie);
    }
  }

  guardarCambios(): void {
    const generos = this._generosSeleccionados.map((genero) => genero.key);
    this._form.get('genres').setValue(generos);

    const cines = this._cinesSeleccionados.map((cine) => cine.key);
    this._form.get('cinemas').setValue(cines);

    const actores = this._actoresSeleccionados.map(
      (actor, index) =>
        <ICharacter>{
          starId: actor.starId,
          character: actor.character,
          order: index,
        }
    );
    this._form.get('cast').setValue(actores);

    this._onSubmit.emit(this._form.value);
  }

  setSelectedImage(image: File): void {
    this._form.get('posterFile').setValue(image);
  }
}
