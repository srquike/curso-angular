import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFormCinema } from 'src/interfaces/ICine';
import { ICoordenada, ILocation } from 'src/interfaces/ICoordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  protected _form: FormGroup;
  protected _coordinates: ILocation[];

  @Input()
  public cinema: IFormCinema;

  @Output()
  protected _onEmit: EventEmitter<IFormCinema>;

  public constructor() {
    this._onEmit = new EventEmitter<IFormCinema>();
    this._form = new FormGroup({
      name: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
    });
    this._coordinates = [];
  }

  ngOnInit(): void {
    if (this.cinema !== undefined) {
      this._form.patchValue(this.cinema);
      this._coordinates.push({
        latitude: this.cinema.latitude,
        longitude: this.cinema.longitude,
      });
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
