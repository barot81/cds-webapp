/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import * as drawerActions from '../actions/drawer.actions';
import { SnackbarService } from '../../services/snackbar.service';
import { DrawerService } from '../../layout/components/drawer/drawer.service';

@Injectable({providedIn: 'any'})
export class DrawerEffects {
  closeDrawer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(drawerActions.CloseDrawer),
        tap(() => this._drawerService.closeDrawer())
      ),
    { dispatch: false }
  );

  closeDrawerWithSnackBarMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(drawerActions.CloseDrawerWithSnackBarMessage),
        tap((payload) => {
          this._drawerService.closeDrawer();
          this._snackbarService.openSnackBar(payload?.payload, payload.action, payload.duration, payload.verticalPosition, payload.horizontalPosition, payload.panelClass);
          this._snackbarService.openCustomSnackBar(
            payload?.payload,
            payload.duration,
            payload.panelClass
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _snackbarService: SnackbarService,
    private _drawerService: DrawerService
  ) {}
}
