import { OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { IGenero } from 'src/interfaces/IGenero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css'],
})
export class FormularioGeneroComponent implements OnInit {
  form: FormGroup;

  @Input()
  modelo: IGenero;

  @Output()
  onSubmit: EventEmitter<IGenero>;

  constructor(private formBuilder: FormBuilder) {
    this.modelo = { id: 0, nombre: '' };

    this.onSubmit = new EventEmitter<IGenero>();
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            primeraLetraMayuscula(),
          ],
        },
      ],
    });
  }

  ngOnInit(): void {
    if (this.modelo !== undefined)
      this.form.patchValue(this.modelo);
  }

  guardar(): void {
    this.onSubmit.emit(this.form.value);
  }

  obtenerMensajeError(): string {
    var campo = this.form.get('nombre');

    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }

    if (campo?.hasError('minlength')) {
      return 'El campo tiene un minimo de 3 caracteres.';
    }

    if (campo?.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }
}
