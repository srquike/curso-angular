import { Component } from '@angular/core';
import { ICrearActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent {

  guardar(actor: ICrearActor): void {
    console.log(actor);
  }
}
