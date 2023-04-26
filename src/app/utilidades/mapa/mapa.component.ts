import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  LeafletMouseEvent,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import { ICoordenada } from 'src/interfaces/ICoordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @Input()
  public modelo: ICoordenada;

  @Output()
  protected submitCoordenada: EventEmitter<ICoordenada>;

  public constructor() {
    this.submitCoordenada = new EventEmitter<ICoordenada>();
  }

  ngOnInit(): void {
    this.capaMarcadores.push(
      marker([13.699202512494862, -89.19183969497682])
    );
  }

  protected options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 15,
    center: latLng(13.699202512494862, -89.19183969497682),
  };

  protected capaMarcadores: Marker<any>[];

  marcarUbicacion(event: LeafletMouseEvent) {
    let coordenada: ICoordenada = {
      latitud: event.latlng.lat,
      longitud: event.latlng.lng,
    };

    this.capaMarcadores = [];
    this.capaMarcadores.push(
      marker([coordenada.latitud, coordenada.longitud], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      })
    );
    this.submitCoordenada.emit(coordenada);
    window.prompt('', `${coordenada.latitud}, ${coordenada.longitud}`);
  }
}
