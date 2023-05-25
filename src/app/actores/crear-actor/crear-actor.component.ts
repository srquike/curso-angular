import { Component } from '@angular/core';
import { IFormActor } from 'src/interfaces/IActor';
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent {
  private _service: ActoresService;
  private _router: Router;

  public constructor(service: ActoresService, router: Router) {
    this._service = service;
    this._router = router;
  }

  createStar(star: IFormActor): void {
    this._service.createStar(star).subscribe({
      next: (createdStarId) => {
        console.log(createdStarId);
        this._router.navigate(['/actores']);
      },
      error: (error) => console.log(error),
    });
  }
}
