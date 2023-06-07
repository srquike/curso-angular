import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { ListadoPeliculasComponent } from './peliculas/listado-peliculas/listado-peliculas.component';
import { ListadoGenericoComponent } from './utilidades/listado-generico/listado-generico.component';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilidades/rating/rating.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListadoGenerosComponent } from './generos/listado-generos/listado-generos.component';
import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { ListadoActoresComponent } from './actores/listado-actores/listado-actores.component';
import { CrearActorComponent } from './actores/crear-actor/crear-actor.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { ListadoCinesComponent } from './cines/listado-cines/listado-cines.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { FormularioGeneroComponent } from './generos/formulario-genero/formulario-genero.component';
import { BuscarPeliculasComponent } from './peliculas/buscar-peliculas/buscar-peliculas.component';
import { FormularioActorComponent } from './actores/formulario-actor/formulario-actor.component';
import { SubirImagenComponent } from './utilidades/subir-imagen/subir-imagen.component';
import { FormularioCineComponent } from './cines/formulario-cine/formulario-cine.component';
import { MapaComponent } from './utilidades/mapa/mapa.component';
import { FormularioPeliculaComponent } from './peliculas/formulario-pelicula/formulario-pelicula.component';
import { SelectorMultipleComponent } from './utilidades/selector-multiple/selector-multiple.component';
import { BusquedaAutocompletarComponent } from './utilidades/busqueda-autocompletar/busqueda-autocompletar.component';
import { CreateStarComponent } from './stars/create-star/create-star.component';
import { FormStarComponent } from './stars/form-star/form-star.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { AuthorizerComponent } from './security/authorizer/authorizer.component';
import { LoginComponent } from './users/login/login.component';
import { SigninComponent } from './users/signin/signin.component';
import { HttpInterceptorService } from './security/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ListadoPeliculasComponent,
    ListadoGenericoComponent,
    MenuComponent,
    RatingComponent,
    LandingPageComponent,
    ListadoGenerosComponent,
    CrearGeneroComponent,
    ListadoActoresComponent,
    CrearActorComponent,
    CrearPeliculaComponent,
    CrearCineComponent,
    ListadoCinesComponent,
    EditarActorComponent,
    EditarGeneroComponent,
    EditarCineComponent,
    EditarPeliculaComponent,
    FormularioGeneroComponent,
    BuscarPeliculasComponent,
    FormularioActorComponent,
    SubirImagenComponent,
    FormularioCineComponent,
    MapaComponent,
    FormularioPeliculaComponent,
    SelectorMultipleComponent,
    BusquedaAutocompletarComponent,
    CreateStarComponent,
    FormStarComponent,
    DetallePeliculaComponent,
    AuthorizerComponent,
    LoginComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    LeafletModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-SV',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
