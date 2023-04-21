import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/interfaces/IMovie';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  peliculasEnCines!: IMovie[];
  peliculasProximosEstrenos!: IMovie[];

  ngOnInit(): void {
      this.peliculasEnCines = [];
      this.peliculasProximosEstrenos = [];
      this.peliculasEnCines.push({
        nombre: 'Spider-Man: No Way Home',
        fechaEstreno: new Date(),
        recaudacion: 15555.8,
        poster: 'https://th.bing.com/th/id/OIP.ueqjk4PcBw5QIgAWaxWWLAHaJQ?pid=ImgDet&rs=1'
      });
      this.peliculasProximosEstrenos.push({
        nombre: 'Moana',
        fechaEstreno: new Date('1998-01-27'),
        recaudacion: 87684.8,
        poster: 'https://th.bing.com/th/id/OIP.-WVuPPTsUlpnGPD5cp4OuAHaLH?pid=ImgDet&w=1365&h=2048&rs=1'
      });
  }
}
