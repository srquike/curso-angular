import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {

  /**
   *
   */
  constructor(private router: Router) {
  }

  guardar():void {
    // guardar los cambios.
    this.router.navigate(['/generos']);
  }
}
