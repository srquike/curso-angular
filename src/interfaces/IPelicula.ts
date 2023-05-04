interface IPeliculaBase {
  title: string;
  releaseDate: string;
  trailerUrl: string;
  mpaaRating: string;
  genres: number[];
  cast: number[];
  cinemas: number[];
}

export interface IPelicula extends IPeliculaBase {
  poster: string;
}

export interface IFormularioPelicula extends IPeliculaBase{
  poster: File;
}