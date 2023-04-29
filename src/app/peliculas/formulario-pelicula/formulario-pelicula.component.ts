import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IElementoSelectorMultiple } from 'src/interfaces/IElementoSelectorMultiple';
import { IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  @Input()
  public modelo: IPelicula;

  @Output()
  protected _onSubmitPelicula: EventEmitter<IPelicula>;

  protected _formulario: FormGroup;

  protected _generosNoSeleccionados: IElementoSelectorMultiple[] = [
    { llave: 1, valor: 'Comedia' },
    { llave: 2, valor: 'Terror' },
    { llave: 3, valor: 'Acción' },
  ];

  protected _cinesNoSeleccionados: IElementoSelectorMultiple[] = [
    { llave: 1, valor: 'Cinépolis' },
    { llave: 2, valor: 'Cinemark' }
  ];

  protected _generosSeleccionados: IElementoSelectorMultiple[] = [];
  protected _cinesSeleccionados: IElementoSelectorMultiple[] = [];

  public constructor(formBuilder: FormBuilder) {
    this._onSubmitPelicula = new EventEmitter<IPelicula>();
    this._formulario = formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      resumen: '',
      esEnCines: false,
      esProximoEstreno: false,
      trailer: '',
      generos: [],
      cines: [],
      recaudacion: '',
      fechaEstreno: '',
      poster: '',
    });
  }

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this._formulario.patchValue(this.modelo);
    }
  }

  guardarCambios(): void {
    const generos = this._generosSeleccionados.map((genero) => genero.llave);
    this._formulario.get('generos').setValue(generos);
    
    const cines = this._cinesSeleccionados.map((cine) => cine.llave);
    this._formulario.get('cines').setValue(cines);

    this._onSubmitPelicula.emit(this._formulario.value);
  }
}
