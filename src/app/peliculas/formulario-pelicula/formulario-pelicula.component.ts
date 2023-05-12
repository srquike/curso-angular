import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActor } from 'src/interfaces/IActor';
import { IElementoSelectorMultiple } from 'src/interfaces/IElementoSelectorMultiple';
import { IFormularioPelicula, IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  @Input()
  public modelo: IPelicula;

  @Output()
  protected _onSubmitPelicula: EventEmitter<IFormularioPelicula>;

  protected _formulario: FormGroup;

  protected _generosNoSeleccionados: IElementoSelectorMultiple[] = [
    { llave: 1, valor: 'Comedia' },
    { llave: 2, valor: 'Terror' },
    { llave: 3, valor: 'Acción' },
  ];

  protected _cinesNoSeleccionados: IElementoSelectorMultiple[] = [
    { llave: 1, valor: 'Cinépolis' },
    { llave: 2, valor: 'Cinemark' },
  ];

  protected _generosSeleccionados: IElementoSelectorMultiple[] = [];
  protected _cinesSeleccionados: IElementoSelectorMultiple[] = [];
  protected _actoresSeleccionados: IActor[] = [];

  public constructor(formBuilder: FormBuilder) {
    this._onSubmitPelicula = new EventEmitter<IFormularioPelicula>();
    this._formulario = formBuilder.group({
      title: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      releaseDate: '',
      trailerUrl: '',
      mpaaRating: '',
      poster: '',
      genres: [],
      cinemas: [],
      cast: [],
    });
  }

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this._formulario.patchValue(this.modelo);
    }
  }

  guardarCambios(): void {
    const generos = this._generosSeleccionados.map((genero) => genero.llave);
    this._formulario.get('genres').setValue(generos);

    const cines = this._cinesSeleccionados.map((cine) => cine.llave);
    this._formulario.get('cinemas').setValue(cines);

    const actores = this._actoresSeleccionados.map((actor) => actor.id);
    this._formulario.get('cast').setValue(actores);

    this._onSubmitPelicula.emit(this._formulario.value);
  }

  setSelectedImage(image: File): void {
    this._formulario.get('poster').setValue(image);
  }
}
