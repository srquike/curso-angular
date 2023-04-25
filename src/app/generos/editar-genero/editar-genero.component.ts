import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IGenero } from 'src/interfaces/IGenero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent {
  modelo: IGenero;

  constructor(private router: Router) {
    this.modelo = { id: 1, nombre: 'Accion' };
  }

  guardar(genero: IGenero): void {
    this.router.navigate(['/generos']);
  }
}
