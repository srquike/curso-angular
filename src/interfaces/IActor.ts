export interface IActorFormulario extends IActorBase {  
  photographyFile: File;
}

interface IActorBase {
  id: number;
  name: string;
  dateOfBirth: Date | string;
}

export interface IActor extends IActorBase {
  photographyURL: string;
}

