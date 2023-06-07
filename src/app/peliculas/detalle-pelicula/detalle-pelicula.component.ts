import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { IPeliculaDetails } from 'src/interfaces/IPelicula';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ILocation } from 'src/interfaces/ICoordenada';
import { RatingsService } from 'src/app/ratings/ratings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css'],
})
export class DetallePeliculaComponent implements OnInit {
  private service: PeliculasService;
  private ratingService: RatingsService;
  private activatedRoute: ActivatedRoute;
  private domSanitizer: DomSanitizer;

  protected movie: IPeliculaDetails;
  protected releaseDate: Date;
  protected trailerUrl: SafeResourceUrl;
  protected coordinates: ILocation[];

  public constructor(
    service: PeliculasService,
    activatedRoute: ActivatedRoute,
    domSanitizer: DomSanitizer,
    ratingService: RatingsService
  ) {
    this.service = service;
    this.activatedRoute = activatedRoute;
    this.domSanitizer = domSanitizer;
    this.ratingService = ratingService;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.service.getById(params['id']).subscribe((movie) => {
        this.movie = movie;
        this.releaseDate = new Date(this.movie.releaseDate);
        this.trailerUrl = this.generateEmbedUrl(this.movie.trailerUrl);
        this.coordinates = this.movie.cinemas.map((c) => {
          return <ILocation>{
            longitude: c.longitude,
            latitude: c.latitude,
            cinemaName: c.name,
          };
        });
      });
    });
  }

  private generateEmbedUrl(url: string): SafeResourceUrl {
    if (!url) {
      return '';
    }

    var videoId = url.split('v=')[1];
    var paramsPosition = videoId.indexOf('&');

    if (paramsPosition !== -1) {
      videoId = videoId.substring(0, paramsPosition);
    }

    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + videoId
    );
  }

  rate(scoring: number): void {
    this.ratingService.create(this.movie.id, scoring).subscribe({
      next: async () => {
        await Swal.fire({
          title: `Has calificado con ${scoring} a ${this.movie.title}`,
          showConfirmButton: true,
          confirmButtonText: 'Genial',
          icon: 'success',
        });
      },
      error: (errors) => console.log(errors),
    });
  }
}
