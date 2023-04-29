import { Component, Input } from '@angular/core';
import { IElementoSelectorMultiple } from 'src/interfaces/IElementoSelectorMultiple';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css'],
})
export class SelectorMultipleComponent {
  @Input()
  public elementosSeleccionados: IElementoSelectorMultiple[];

  @Input()
  public elementosNoSeleccionados: IElementoSelectorMultiple[];


  public constructor() {
    this.elementosNoSeleccionados = [];
    this.elementosSeleccionados = [];
  }

  seleccionarTodos(): void {
    this.elementosSeleccionados.push(...this.elementosNoSeleccionados);
    this.elementosNoSeleccionados = [];
  }

  deseleccionarTodos(): void {
    this.elementosNoSeleccionados.push(...this.elementosSeleccionados);
    this.elementosSeleccionados = [];
  }

  seleccionarElemento(elemento: IElementoSelectorMultiple, i: number): void {
    this.elementosSeleccionados.push(elemento);
    this.elementosNoSeleccionados.splice(i, 1);
  }

  deseleccionarElemento(elemento: IElementoSelectorMultiple, i: number): void {
    this.elementosNoSeleccionados.push(elemento);
    this.elementosSeleccionados.splice(i, 1);
  }
}