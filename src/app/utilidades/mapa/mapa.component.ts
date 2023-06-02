import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  LeafletMouseEvent,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import { ICoordenada, ILocation } from 'src/interfaces/ICoordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @Input()
  public coordinates: ILocation[];

  @Input()
  public readOnly: boolean;

  @Output()
  protected submitCoordenada: EventEmitter<ICoordenada>;

  public constructor() {
    this.submitCoordenada = new EventEmitter<ICoordenada>();
    this.capaMarcadores = [];
    this.coordinates = [];
    this.readOnly = false;
  }

  ngOnInit(): void {
    this.options.center = latLng(this.coordinates[0].latitude, this.coordinates[0].longitude);
    this.capaMarcadores = this.coordinates.map((c) => {
      let mark = marker([c.latitude, c.longitude]);

      if (c.cinemaName) {
        mark.bindPopup(c.cinemaName, { autoClose: false, autoPan: false });
      }

      return mark;
    });
  }

  private colocarMarcador(coordenadas: ICoordenada) {
    this.capaMarcadores = [];
    this.capaMarcadores.push(
      marker([coordenadas.latitude, coordenadas.longitude], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      })
    );
  }

  protected options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 9,
    center: latLng(13.699202512494862, -89.19183969497682),
  };

  protected capaMarcadores: Marker<any>[];

  marcarUbicacion(event: LeafletMouseEvent) {
    if (!this.readOnly) {
      let coordenadas: ICoordenada = {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      };
      this.colocarMarcador(coordenadas);
      this.submitCoordenada.emit(coordenadas);
    }
  }
}
