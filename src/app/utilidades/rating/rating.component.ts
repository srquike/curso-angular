import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from 'src/app/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  private service: UsersService;

  public constructor(service: UsersService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.votoAnterior = this.ratingSeleccionado;
    this.estrellas = Array(this.maximoRating).fill(0);
  }

  @Input()
  maximoRating = 5;

  @Input()
  ratingSeleccionado = 0;

  @Output()
  voto: EventEmitter<number> = new EventEmitter<number>();

  estrellas: Array<number> = [];

  votado: boolean = false;

  votoAnterior: number = 0;

  manejarMouseEnter(indice: number): void {
    this.ratingSeleccionado = indice + 1;
  }

  manejasMouseLeave(): void {
    if (this.votoAnterior !== 0) {
      this.ratingSeleccionado = this.votoAnterior;
    } else {
      this.ratingSeleccionado = 0;
    }
  }

  async seleccionar(indice: number): Promise<void> {
    if (this.service.isLoggedIn()) {
      this.ratingSeleccionado = indice + 1;
      this.votado = true;
      this.votoAnterior = this.ratingSeleccionado;
      this.voto.emit(this.ratingSeleccionado);
    } else {
      await Swal.fire({
        title: `Inicia sesi&oacute;n para poder calificar`,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        icon: 'warning',
      });
    }
  }
}
