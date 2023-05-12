import { Component, OnInit } from '@angular/core';
import { IActor } from 'src/interfaces/IActor';
import { ActoresService } from '../actores.service';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-actores',
  templateUrl: './listado-actores.component.html',
  styleUrls: ['./listado-actores.component.css'],
})
export class ListadoActoresComponent implements OnInit {
  protected _stars: IActor[];
  protected _columns: string[];
  protected _length: number;
  protected _pageSize: number;
  protected _pageNumber: number;
  protected _service: ActoresService;

  public constructor(service: ActoresService) {
    this._service = service;
    this._columns = ['id', 'name', 'dateOfBirth', 'options'];
    this._pageSize = 10;
    this._pageNumber = 1;
  }

  ngOnInit(): void {
    this.loadStars(this._pageSize, this._pageNumber);
  }

  loadStars(itemsToDisplay: number, pageNumber: number): void {
    this._service.getStars(itemsToDisplay, pageNumber).subscribe({
      next: (response: HttpResponse<IActor[]>) => {
        this._stars = response.body;
        this._length = parseInt(response.headers.get('itemsCount'));
      },
      error: (error) => console.log(error),
    });
  }

  pageStars(page: PageEvent): void {
    this._pageNumber = page.pageIndex + 1;
    this._pageSize = page.pageSize;
    this.loadStars(this._pageSize, this._pageNumber);
  }

  async deleteStar(starId: number, starName: string): Promise<void> {
    let confirm = await Swal.fire({
      title: `Está seguro que desea eliminar el registro de la estrella [${starName.toUpperCase()}]`,
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: 'Cancelar',
      icon: 'question',
    });

    if (confirm.isConfirmed) {
      this._service.deleteStar(starId).subscribe({
        next: () => {
          this.loadStars(this._pageSize, this._pageNumber);
        },
        error: (error) => console.log(error),
      });
    }
  }
}
