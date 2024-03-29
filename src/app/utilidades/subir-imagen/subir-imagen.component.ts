import { Component, EventEmitter, Input, Output } from '@angular/core';
import { aBase64 } from '../utilidades';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css'],
})
export class SubirImagenComponent {
  
  @Input()
  public urlImagenActual: string | File;

  @Output()
  protected onSelectImage: EventEmitter<File>;
  
  protected imagenBase64: string | ArrayBuffer;

  public constructor() {
    this.onSelectImage = new EventEmitter<File>();
  }

  protected async onChange(inputFileEvent: Event): Promise<void> {

    let inputFileElement = inputFileEvent.target as HTMLInputElement;

    if (inputFileElement.files.length > 0) {
      const file: File = inputFileElement.files[0];
      this.imagenBase64 = await aBase64(file);
      this.onSelectImage.emit(file);
      this.urlImagenActual = null;
    }
  }
}