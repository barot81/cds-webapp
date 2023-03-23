import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { createAction, props } from '@ngrx/store';

export const CloseDrawer = createAction(
  '[Close Drawer] Close Drawer'
);

export const CloseDrawerWithSnackBarMessage = createAction(
  '[Close CloseDrawerWithSnackBarMessage] Close CloseDrawerWithSnackBarMessage',
  props<{ payload: string, action?: string, duration?: number, verticalPosition?: MatSnackBarVerticalPosition, horizontalPosition?: MatSnackBarHorizontalPosition, panelClass?: string }>()
);

export const ToggleActionProgressState = createAction(
  '[Toggle ProgressUI State] Toggle ActionProgress State'
);

export const UpdateActionProgressState = createAction(
  '[Update ProgressUI State] Update ActionProgress State',
  props<{ payload: boolean }>()
);
