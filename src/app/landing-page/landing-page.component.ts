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
        nombre: 'Spider-Man: No Way Home',
        esEnCines: true,
        esProximoEstreno: false,
        fechaEstreno: new Date(),
        poster: 'https://th.bing.com/th/id/OIP.ibW3TZfXdpRsgQKgKqctzgAAAA?pid=ImgDet&w=360&h=450&rs=1',
        recaudacion: 1584512.5,
        generos: []
      }];
      this.peliculasProximosEstrenos = [{ 
        nombre: 'Moana',
        esEnCines: false,
        esProximoEstreno: true,
        fechaEstreno: new Date('2023-05-21'),
        poster: 'https://th.bing.com/th/id/OIP.ibW3TZfXdpRsgQKgKqctzgAAAA?pid=ImgDet&w=360&h=450&rs=1',
        recaudacion: 1584512.5,
        generos: []
      }];
  }
}
