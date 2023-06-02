import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';
import Swal from 'sweetalert2';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent {
  private service: PeliculasService;

  @Input()
  movies: IPelicula[];

  @Output()
  protected onDelete: EventEmitter<void>;

  public constructor(service: PeliculasService) {
    this.service = service;
    this.movies = [];
    this.onDelete = new EventEmitter<void>();
  }

  protected async delete(id: number, title: string): Promise<void> {
    let confirm = await Swal.fire({
      title: `Está seguro que desea eliminar el registro de la película [${title.toUpperCase()}]`,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    });

    if (confirm.isConfirmed) {
      this.service.delete(id).subscribe({
        next: () => this.onDelete.emit(),
      });
    }
  }
}
