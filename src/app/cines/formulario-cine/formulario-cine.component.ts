import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICine } from 'src/interfaces/ICine';
import { ICoordenada } from 'src/interfaces/ICoordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  protected _form: FormGroup;
  protected _coordinates: ICoordenada;

  @Input()
  public cinema: ICine;

  @Output()
  protected _onEmit: EventEmitter<ICine>;

  public constructor() {
    this._onEmit = new EventEmitter<ICine>();
    this._form = new FormGroup({
      name: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.cinema !== undefined) {
      this._form.patchValue(this.cinema);
      this._coordinates = {
        latitude: this.cinema.latitude,
        longitude: this.cinema.longitude,
      };
    }
  }

  onSubmitCine(): void {
    this._onEmit.emit(this._form.value);
  }

  obtenerCoordenadas(coordenadas: ICoordenada): void {
    this._form.get('latitude').setValue(coordenadas.latitude);
    this._form.get('longitude').setValue(coordenadas.longitude);
  }
}
