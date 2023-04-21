import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/interfaces/IMovie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  peliculasEnCines!: IMovie[];
  peliculasProximosEstrenos!: IMovie[];

  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [];
      this.peliculasProximosEstrenos = [];
      this.peliculasEnCines.push({
        nombre: 'Spider-Man: No Way Home',
        fechaEstreno: new Date(),
        recaudacion: 15555.8,
      });
      this.peliculasProximosEstrenos.push({
        nombre: 'Moana',
        fechaEstreno: new Date('1998-01-27'),
        recaudacion: 87684.8,
      });
    }, 3000);
  }
}
