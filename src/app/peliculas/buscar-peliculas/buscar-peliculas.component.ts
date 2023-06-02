import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GenerosService } from 'src/app/generos/generos.service';
import { IGenero } from 'src/interfaces/IGenero';
import { IPelicula } from 'src/interfaces/IPelicula';
import { PeliculasService } from '../peliculas.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-buscar-peliculas',
  templateUrl: './buscar-peliculas.component.html',
  styleUrls: ['./buscar-peliculas.component.css'],
})
export class BuscarPeliculasComponent implements OnInit {
  private genresService: GenerosService;
  private moviesService: PeliculasService;
  private location: Location;
  private activatedRoute: ActivatedRoute;

  protected genres: IGenero[];
  protected movies: IPelicula[];
  protected form: FormGroup;
  protected length: number;
  protected pageSize: number;
  protected pageNumber: number;

  constructor(
    genresService: GenerosService,
    moviesService: PeliculasService,
    location: Location,
    activatedRoute: ActivatedRoute
  ) {
    this.genresService = genresService;
    this.moviesService = moviesService;
    this.location = location;
    this.activatedRoute = activatedRoute;

    this.genres = [];
    this.pageSize = 10;
    this.pageNumber = 1;

    this.form = new FormGroup({
      title: new FormControl(''),
      genre: new FormControl(''),
      comingSoon: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.genresService.get().subscribe({
      next: (response) => (this.genres = response),
      error: (error) => window.alert('No fue posible obtener la lista de géneros: ' + error),
    });

    this.clearSearch();
    this.getUrlParams();
    this.search(this.form.value);

    this.form.valueChanges.subscribe({
      next: (values) => {
        this.search(values);
        this.setUrlParams();
      },
    });
  }

  protected clearSearch(): void {
    this.form.get('title').setValue('');
    this.form.get('genre').setValue('');
    this.form.get('comingSoon').setValue(false);
  }

  protected search(values: any): void {
    values.pageNumber = this.pageNumber;
    values.itemsToDisplay = this.pageSize;

    if (values.genre === '' || values.genre === '0') {
      delete values.genre;
    }

    this.moviesService.get(values).subscribe({
      next: (response: HttpResponse<IPelicula[]>) => {
        this.movies = response.body;
        this.length = parseInt(response.headers.get('itemsCount'));
        this.setUrlParams();
      },
    });
  }

  protected getUrlParams() {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        let object: any = {};

        if (params['title']) object.title = params['title'];

        if (params['genre']) object.genre = params['title'];

        if (params['comingSoon']) object.comingSoon = params['comingSoon'];

        this.form.patchValue(object);
      },
    });
  }

  protected setUrlParams(): void {
    let queryString = [];
    let formValues = this.form.value;

    if (formValues.title) {
      queryString.push('title=' + formValues.title);
    }

    if (formValues.genre !== '0' && formValues.genre !== '' && formValues.genre !== undefined) {
      queryString.push('genre=' + formValues.genre);
    }

    if (formValues.comingSoon) {
      queryString.push('comingSoon=' + formValues.comingSoon);
    }

    this.location.replaceState('peliculas/buscar', queryString.join('&'));
  }

  protected page(page: PageEvent): void {
    this.pageNumber = page.pageIndex + 1;
    this.pageSize = page.pageSize;
    this.search(this.form.value);
  }
}
