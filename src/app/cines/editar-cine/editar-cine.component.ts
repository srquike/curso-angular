import { Component } from '@angular/core';
import { IFormCinema } from 'src/interfaces/ICine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent {
  protected _modelo: IFormCinema;

  public constructor() {
    this._modelo = {
      id: 1,
      name: 'Cinepolis',
      latitude: 13.693566194583033,
      longitude: -89.20125961303712,
    };
  }

  editarCine(cine: IFormCinema): void {}
}
