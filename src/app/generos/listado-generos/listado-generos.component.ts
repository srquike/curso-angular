import { Component, OnInit } from '@angular/core';
import { IGenero } from 'src/interfaces/IGenero';
import { GenerosService } from '../generos.service';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-generos',
  templateUrl: './listado-generos.component.html',
  styleUrls: ['./listado-generos.component.css'],
})
export class ListadoGenerosComponent implements OnInit {
  protected _genres: IGenero[];
  protected _service: GenerosService;
  protected _columns: string[];
  protected _length: number;
  protected _pageSize: number;
  protected _pageNumber: number;

  public constructor(service: GenerosService) {
    this._service = service;
    this._columns = ['id', 'name', 'options'];
    this._pageSize = 10;
    this._pageNumber = 1;
  }

  ngOnInit(): void {
    this.loadGenres(this._pageSize, this._pageNumber);
  }

  loadGenres(itemsToDisplay: number, pageNumber: number): void {
    this._service.obtenerGeneros(itemsToDisplay, pageNumber).subscribe({
      next: (response: HttpResponse<IGenero[]>) => {
        this._genres = response.body;
        this._length = parseInt(response.headers.get('itemsCount'));
      },
      error: (error) => console.log(error),
    });
  }

  pageGenres(page: PageEvent): void {
    this._pageNumber = page.pageIndex + 1;
    this._pageSize = page.pageSize;
    this.loadGenres(this._pageSize, this._pageNumber);
  }

  async deleteGenre(genreId: number, genreName: string): Promise<void> {
    let confirm = await Swal.fire({
      title: `Está seguro que desea eliminar el registro del género [${genreName.toUpperCase()}]`,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    });

    if (confirm.isConfirmed) {
      this._service.deleteGenre(genreId).subscribe({
        next: () => {
          this.loadGenres(this._pageSize, this._pageNumber);
        },
        error: (error) => console.log(error),
      });
    }
  }
}
