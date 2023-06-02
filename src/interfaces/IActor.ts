export interface IFormActor {
  id: number;
  name: string;
  dateOfBirth: Date | string;
  photography: File | string;
}

export interface ISearchActor {
  id: number;
  name: string;
  photography: string;
  character?: string;
}

export interface ICharacter {
  starId: number;
  character: string;
  order: number;
}

export interface IActorPelicula {
  starId: number;
  character: string;
  starName: string;
  order: number;
  photographyUrl: string;
}
