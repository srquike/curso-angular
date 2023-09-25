import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-form-star',
  templateUrl: './form-star.component.html',
  styleUrls: ['./form-star.component.css'],
})
export class FormStarComponent implements OnInit {
  @Output()
  protected _onEmit: EventEmitter<IFormActor>;

  @Input()
  public _star: IFormActor;
  
  protected _form: FormGroup;

  public constructor() {
    this._form = new FormGroup({
      name: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      photographyFile: new FormControl(''),
    });
    this._onEmit = new EventEmitter<IFormActor>();
  }

  ngOnInit(): void {
    if (this._star !== undefined) {
      this._star.dateOfBirth
      this._form.patchValue(this._star);
    }
  }

  onSubmit(): void {
    this._onEmit.emit(this._form.value);
  }

  setImageFile(imageFile: File): void {
    this._form.get('photographyFile').setValue(imageFile);
  }
}
