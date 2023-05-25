import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IFormActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-formulario-actor',
  templateUrl: './formulario-actor.component.html',
  styleUrls: ['./formulario-actor.component.css'],
})
export class FormularioActorComponent implements OnInit {
  protected _form: FormGroup;
  private _formBuilder: FormBuilder;

  @Input()
  modelo: IFormActor;

  @Output()
  protected submitActor: EventEmitter<IFormActor>;

  constructor(formBuilder: FormBuilder) {
    this.submitActor = new EventEmitter<IFormActor>();
    this._formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this._form = new FormGroup({
      name: new FormControl(''),
      dateOfBirth: new FormControl(''),
      photographyFile: new FormControl(''),
    });

    if (this.modelo !== undefined) {
      this._form.patchValue(this.modelo);
    }
  }

  onSubmit(): void {
    this.submitActor.emit(this._form.value);
  }

  imagenSeleccionada(archivo: File): void {
    this._form.get('photographyFile').setValue(archivo);
  }
}
