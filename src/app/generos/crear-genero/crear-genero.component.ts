import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGenero } from 'src/interfaces/IGenero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css'],
})
export class CrearGeneroComponent {
  constructor(private router: Router) {}

  guardar(genero: IGenero): void {
    console.log(genero);
    this.router.navigate(['/generos']);
  }
}
