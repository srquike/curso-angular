import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { IPeliculaDetails } from 'src/interfaces/IPelicula';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ILocation } from 'src/interfaces/ICoordenada';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css'],
})
export class DetallePeliculaComponent implements OnInit {
  private service: PeliculasService;
  private activatedRoute: ActivatedRoute;
  private domSanitizer: DomSanitizer;

  protected movie: IPeliculaDetails;
  protected releaseDate: Date;
  protected trailerUrl: SafeResourceUrl;
  protected coordinates: ILocation[];

  public constructor(
    service: PeliculasService,
    activatedRoute: ActivatedRoute,
    domSanitizer: DomSanitizer
  ) {
    this.service = service;
    this.activatedRoute = activatedRoute;
    this.domSanitizer = domSanitizer;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.service.getById(params['id']).subscribe((movie) => {
        console.log(movie);
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
}
