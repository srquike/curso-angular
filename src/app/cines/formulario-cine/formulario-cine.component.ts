import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICine } from 'src/interfaces/ICine';
import { ICoordenada } from 'src/interfaces/ICoordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  protected _formBuilder: FormBuilder;
  protected _formulario: FormGroup;

  @Input()
  public modelo: ICine;

  @Output()
  protected _submitCine: EventEmitter<ICine>;

  public constructor(formBuilder: FormBuilder) {
    this._formBuilder = formBuilder;
    this._submitCine = new EventEmitter<ICine>();
  }

  ngOnInit(): void {
    this._formulario = this._formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      latitud: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      longitud: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    if (this.modelo !== undefined) {
      this._formulario.patchValue(this.modelo);
      this._formulario.get('latitud').setValue(this.modelo.coordenada.latitud);
      this._formulario.get('longitud').setValue(this.modelo.coordenada.longitud);
    }
  }

  onSubmitCine(): void {
    this._submitCine.emit(this._formulario.value);
  }

  obtenerCoordenadas(coordenadas: ICoordenada): void {
    this._formulario.patchValue(coordenadas);
  }
}