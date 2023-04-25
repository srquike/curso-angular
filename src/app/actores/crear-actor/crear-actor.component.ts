import { Component } from '@angular/core';
import { IActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent {

  guardar(actor: IActor): void {
    console.log(actor);
  }
}
