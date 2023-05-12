import { Component, OnInit } from '@angular/core';
import { ICine } from 'src/interfaces/ICine';
import { CinemasService } from '../cinemas.service';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-cines',
  templateUrl: './listado-cines.component.html',
  styleUrls: ['./listado-cines.component.css'],
})
export class ListadoCinesComponent implements OnInit {
  private _service: CinemasService;

  protected _cinemas: ICine[];
  protected _columns: string[];
  protected _length: number;
  protected _pageSize: number;
  protected _pageNumber: number;

  public constructor(service: CinemasService) {
    this._service = service;
    this._columns = ['id', 'name', 'options'];
    this._pageSize = 10;
    this._pageNumber = 1;
  }

  ngOnInit(): void {
    this.loadCinemas(this._pageSize, this._pageNumber);
  }

  loadCinemas(itemsToDisplay: number, pageNumber: number): void {
    this._service.obtenerCinemas(itemsToDisplay, pageNumber).subscribe({
      next: (response: HttpResponse<ICine[]>) => {
        this._cinemas = response.body;
        this._length = parseInt(response.headers.get('itemsCount'));
      },
      error: (error) => console.log(error),
    });
  }

  pageCinemas(page: PageEvent): void {
    this._pageNumber = page.pageIndex + 1;
    this._pageSize = page.pageSize;
    this.loadCinemas(this._pageSize, this._pageNumber);
  }

  async deleteCinema(cinemaId: number, cinemaName: string): Promise<void> {
    let confirm = await Swal.fire({
      title: `Está seguro que desea eliminar el registro del ciné [${cinemaName.toUpperCase()}]`,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    });

    if (confirm.isConfirmed) {
      this._service.deleteCinema(cinemaId).subscribe({
        next: () => {
          this.loadCinemas(this._pageSize, this._pageNumber);
        },
        error: (error) => console.log(error),
      });
    }
  }
}
