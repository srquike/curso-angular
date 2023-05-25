import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormActor } from 'src/interfaces/IActor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  private _activateRoute: ActivatedRoute;
  private _service: ActoresService;
  private _router: Router;

  protected _starId: number;
  protected _star: IFormActor;

  constructor(
    activateRoute: ActivatedRoute,
    service: ActoresService,
    router: Router
  ) {
    this._activateRoute = activateRoute;
    this._service = service;
    this._router = router;
  }

  ngOnInit(): void {
    this._activateRoute.params.subscribe((p) => {
      this._starId = parseInt(p['id']);
      this._service.getStarById(this._starId).subscribe({
        next: (response) => {
          response.dateOfBirth = new Date(response.dateOfBirth);
          this._star = response;
        },
        error: (error) => console.log(error),
      });
    });
  }

  editStar(star: IFormActor): void {
    this._service.editStar(star, this._starId).subscribe({
      next: () => {
        this._router.navigate(['/actores']);
      },
      error: (error) => console.log(error),
    });
  }
}
