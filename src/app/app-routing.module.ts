import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListadoGenerosComponent } from './generos/listado-generos/listado-generos.component';
import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { ListadoActoresComponent } from './actores/listado-actores/listado-actores.component';
import { CrearActorComponent } from './actores/crear-actor/crear-actor.component';
import { ListadoCinesComponent } from './cines/listado-cines/listado-cines.component';
import { CrearCineComponent } from './cines/crear-cine/crear-cine.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EditarActorComponent } from './actores/editar-actor/editar-actor.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { EditarCineComponent } from './cines/editar-cine/editar-cine.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { BuscarPeliculasComponent } from './peliculas/buscar-peliculas/buscar-peliculas.component';

import { CreateStarComponent } from './stars/create-star/create-star.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'generos', component: ListadoGenerosComponent },
  { path: 'generos/crear', component: CrearGeneroComponent },
  { path: 'generos/editar/:id', component: EditarGeneroComponent },
  { path: 'actores', component: ListadoActoresComponent },
  { path: 'actores/crear', component: CreateStarComponent },
  { path: 'actores/editar/:id', component: EditarActorComponent },
  { path: 'cines', component: ListadoCinesComponent },
  { path: 'cines/crear', component: CrearCineComponent },
  { path: 'cines/editar/:id', component: EditarCineComponent },
  { path: 'peliculas/crear', component: CrearPeliculaComponent },
  { path: 'peliculas/editar/:id', component: EditarPeliculaComponent },
  { path: 'peliculas/buscar', component: BuscarPeliculasComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
