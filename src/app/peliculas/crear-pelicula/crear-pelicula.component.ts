import { Component, OnInit } from '@angular/core';
import { IFormularioPelicula } from 'src/interfaces/IPelicula';
import { PeliculasService } from '../peliculas.service';
import { IElementoSelectorMultiple } from 'src/interfaces/IElementoSelectorMultiple';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  private service: PeliculasService;
  private router: Router;

  protected noSelectedGenres: IElementoSelectorMultiple[];
  protected noSelectedCinemas: IElementoSelectorMultiple[];

  public constructor(service: PeliculasService, router: Router) {
    this.service = service;
    this.router = router;
    this.noSelectedCinemas = [];
    this.noSelectedGenres = [];
  }

  ngOnInit(): void {
    this.service.getResources().subscribe({
      next: (result) => {
        this.noSelectedGenres = result.genres.map((g) => {
          return <IElementoSelectorMultiple>{
            key: g.id,
            value: g.name,
          };
        });
        this.noSelectedCinemas = result.cinemas.map((c) => {
          return <IElementoSelectorMultiple>{
            key: c.id,
            value: c.name,
          };
        });
      },
    });
  }

  crearPelicula(pelicula: IFormularioPelicula): void {
    this.service.crearPelicula(pelicula).subscribe({
      next: (result) => this.router.navigate(['/peliculas/' + result['id']]),
      error: (error) => console.log(error),
    });
  }
}
