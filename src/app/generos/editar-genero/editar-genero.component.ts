import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGenero } from 'src/interfaces/IGenero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent implements OnInit {
  protected _modelo: IGenero;

  private _service: GenerosService;
  private _activatedRoute: ActivatedRoute;
  private _router: Router;
  private _genreId: number;

  constructor(
    router: Router,
    service: GenerosService,
    activatedRoute: ActivatedRoute
  ) {
    this._router = router;
    this._service = service;
    this._activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((p) => {
      this._genreId = parseInt(p['id']);
      this._service.getGenreById(this._genreId).subscribe({
        next: (response) => (this._modelo = response),
        error: (error) => console.log(error),
      });
    });
  }

  editGenre(genero: IGenero): void {
    this._service.editGenre(genero, this._genreId).subscribe({
      next: () => {
        this._router.navigate(['/generos']);
      },
      error: (error) => console.log(error),
    });
  }
}
