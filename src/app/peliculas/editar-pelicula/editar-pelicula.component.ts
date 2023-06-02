import { Component, Input, OnInit } from '@angular/core';
import { IFormularioPelicula, IPelicula } from 'src/interfaces/IPelicula';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IElementoSelectorMultiple } from 'src/interfaces/IElementoSelectorMultiple';
import { IActorPelicula } from 'src/interfaces/IActor';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  private service: PeliculasService;
  private activatedRoute: ActivatedRoute;
  private router: Router;
  private id: number;

  protected movie: IPelicula;
  protected noSelectedGenres: IElementoSelectorMultiple[];
  protected noSelectedCinemas: IElementoSelectorMultiple[];
  protected genres: IElementoSelectorMultiple[];
  protected cinemas: IElementoSelectorMultiple[];
  protected cast: IActorPelicula[];
  
  public constructor(service: PeliculasService, activatedRoute: ActivatedRoute, router: Router) {
    this.router = router;
    this.service = service;
    this.activatedRoute = activatedRoute;
    this.noSelectedCinemas = [];
    this.noSelectedGenres = [];
    this.cinemas = [];
    this.genres = [];
    this.cast = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.service.getForEditing(this.id).subscribe(movie => {
        this.movie = movie.movie;
        this.movie.releaseDate = new Date(movie.movie.releaseDate);
        this.noSelectedGenres = movie.noSelectedGenres.map((g) => {
          return <IElementoSelectorMultiple>{
            key: g.id,
            value: g.name,
          };
        });
        this.noSelectedCinemas = movie.noSelectedCinemas.map((c) => {
          return <IElementoSelectorMultiple>{
            key: c.id,
            value: c.name,
          };
        });
        this.cinemas = movie.cinemas.map((c) => {
          return <IElementoSelectorMultiple>{
            key: c.id,
            value: c.name,
          };
        });
        this.genres = movie.genres.map((c) => {
          return <IElementoSelectorMultiple>{
            key: c.id,
            value: c.name,
          };
        });
        this.cast = movie.cast;
      });
    })
  }



  protected edit(movie: IFormularioPelicula): void {
    this.service.edit(movie, this.id).subscribe({
      complete: () => this.router.navigate(['/peliculas/' + this.id]),
      error: () => window.alert('Ocurrió un error al intentar modificar la película.')
    })
  }
}
