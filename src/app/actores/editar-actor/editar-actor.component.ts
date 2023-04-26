import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICrearActor, IEditarActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  protected modelo: IEditarActor;

  constructor(private activateRoute: ActivatedRoute) {
    this.modelo = {
      id: 1,
      nombre: 'Jonathan Vanegas',
      fechaNacimiento: new Date('1998-01-27'),
      foto: 'https://m.media-amazon.com/images/M/MV5BMTU0MTQ4OTMyMV5BMl5BanBnXkFtZTcwMTQxOTY1NA@@._V1_FMjpg_UX1000_.jpg'
    };
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      console.log(params['id']);
    });
  }

  guardar(actor: ICrearActor): void {
    console.log(actor);
  }
}
