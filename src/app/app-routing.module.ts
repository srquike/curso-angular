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

const siteName = 'Starflix :: '

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'generos',
    component: ListadoGenerosComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Géneros'
  },
  {
    path: 'generos/crear',
    component: CrearGeneroComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Crear género'
  },
  {
    path: 'generos/editar/:id',
    component: EditarGeneroComponent,
    title: siteName + 'Editar género'
  },
  {
    path: 'actores',
    component: ListadoActoresComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Estrellas'
  },
  {
    path: 'actores/crear',
    component: CreateStarComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Crear estrella'
  },
  {
    path: 'actores/editar/:id',
    component: EditarActorComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Editar estrella'
  },
  {
    path: 'cines',
    component: ListadoCinesComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Cines'
  },
  {
    path: 'cines/crear',
    component: CrearCineComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Crear cine'
  },
  {
    path: 'cines/editar/:id',
    component: EditarCineComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Editar cine'
  },
  {
    path: 'peliculas/crear',
    component: CrearPeliculaComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Crear película'
  },
  {
    path: 'peliculas/editar/:id',
    component: EditarPeliculaComponent,
    canActivate: [IsLoggedIn],
    title: siteName + 'Editar película'
  },
  { path: 'peliculas/buscar', component: BuscarPeliculasComponent, title: siteName + 'Buscar películas' },
  {
    path: 'peliculas/:id',
    component: DetallePeliculaComponent,
    title: siteName + 'Ver película'
  },
  {
    path: 'users/login',
    component: LoginComponent,
    title: siteName + 'Inicio de sesión'
  },
  {
    path: 'users/signin',
    component: SigninComponent,
    title: siteName + 'Registrarme'
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
