export interface ICrearActor extends IActor {  
  foto: File;
}

interface IActor {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  personaje?: string;
}

export interface IEditarActor extends IActor {
  foto: string;
}