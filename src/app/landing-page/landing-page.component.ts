import { Component, OnInit } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  peliculasEnCines!: IPelicula[];
  peliculasProximosEstrenos!: IPelicula[];

  ngOnInit(): void {
      this.peliculasEnCines = [{
        title: 'Spider-Man: No Way Home',
        releaseDate: new Date().toDateString(),
        genres: [1, 2],
        poster: '',
        cast: [],
        cinemas: [],
        mpaaRating: 'PG-13',
        trailerUrl: ''
      }];
      this.peliculasProximosEstrenos = [];
  }
}
