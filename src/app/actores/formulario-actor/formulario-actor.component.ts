import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-formulario-actor',
  templateUrl: './formulario-actor.component.html',
  styleUrls: ['./formulario-actor.component.css']
})
export class FormularioActorComponent implements OnInit {

  protected formulario: FormGroup;

  @Input()
  modelo: IActor;

  @Output()
  protected submitActor: EventEmitter<IActor>;

  constructor(private formBuilder: FormBuilder) {
    this.submitActor = new EventEmitter<IActor>();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', {
        validators: [ Validators.required ]
      }],
      fechaNacimiento: ''
    });

    if (this.modelo !== undefined) {
      this.formulario.patchValue(this.modelo);
    }
  }

  onSubmit(): void {
    this.submitActor.emit(this.formulario.value);
  }
}
