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
import { DetallePeliculaComponent } from './peliculas/detalle-pelicula/detalle-pelicula.component';
import { IsLoggedIn } from './auth.guard';
import { LoginComponent } from './users/login/login.component';
import { SigninComponent } from './users/signin/signin.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'generos',
    component: ListadoGenerosComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'generos/crear',
    component: CrearGeneroComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'generos/editar/:id',
    component: EditarGeneroComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'actores',
    component: ListadoActoresComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'actores/crear',
    component: CreateStarComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'actores/editar/:id',
    component: EditarActorComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'cines',
    component: ListadoCinesComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'cines/crear',
    component: CrearCineComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'cines/editar/:id',
    component: EditarCineComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'peliculas/crear',
    component: CrearPeliculaComponent,
    canActivate: [IsLoggedIn],
  },
  {
    path: 'peliculas/editar/:id',
    component: EditarPeliculaComponent,
    canActivate: [IsLoggedIn],
  },
  { path: 'peliculas/buscar', component: BuscarPeliculasComponent },
  {
    path: 'peliculas/:id',
    component: DetallePeliculaComponent,
  },
  {
    path: 'users/login',
    component: LoginComponent,
  },
  {
    path: 'users/signin',
    component: SigninComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
