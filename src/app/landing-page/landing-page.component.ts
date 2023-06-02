import { Component, OnInit } from '@angular/core';
import { IPelicula } from 'src/interfaces/IPelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {

  private service: PeliculasService;

  onCinemas: IPelicula[];
  comingSoon: IPelicula[];

  public constructor(service: PeliculasService) {
    this.comingSoon = [];
    this.onCinemas = [];
    this.service = service;
  }

  ngOnInit(): void {
    this.service.getLandingPageResources().subscribe(landingPageResources => {
      this.comingSoon = landingPageResources.comingSoon;
      this.onCinemas = landingPageResources.onCinemas;
    });
  }
}
