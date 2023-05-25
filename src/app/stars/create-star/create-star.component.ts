import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActoresService } from 'src/app/actores/actores.service';
import { IFormActor } from 'src/interfaces/IActor';

@Component({
  selector: 'app-create-star',
  templateUrl: './create-star.component.html',
  styleUrls: ['./create-star.component.css'],
})
export class CreateStarComponent {
  private _service: ActoresService;
  private _router: Router;

  public constructor(service: ActoresService, router: Router) {
    this._service = service;
    this._router = router;
  }

  protected createStar(star: IFormActor): void {
    this._service.createStar(star).subscribe({
      next: (createdStarId) => {
        console.log(createdStarId);
        this._router.navigate(['/actores']);
      },
      error: (error) => console.log(error),
    });
  }
}
