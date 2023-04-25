import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  protected modelo: IActor;

  constructor(private activateRoute: ActivatedRoute) {
    this.modelo = {
      id: 1,
      nombre: 'Jonathan Vanegas',
      fechaNacimiento: new Date('1998-01-27'),
    };
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      console.log(params['id']);
    });
  }

  guardar(actor: IActor): void {
    console.log(actor);
  }
}
