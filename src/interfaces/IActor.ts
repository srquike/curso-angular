export interface ICrearActor extends IActor {  
  foto: File;
}

interface IActor {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
}

export interface IEditarActor extends IActor {
  foto: string;
}
