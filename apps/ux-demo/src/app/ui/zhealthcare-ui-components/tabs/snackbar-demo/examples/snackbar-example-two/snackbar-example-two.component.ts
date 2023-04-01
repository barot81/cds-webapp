import { Component } from '@angular/core';
import { SnackbarService } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-snackbar-example-two',
  templateUrl: './snackbar-example-two.component.html',
  styleUrls: ['./snackbar-example-two.component.scss'],
})
export class SnackbarExampleTwoComponent {
  message: string = 'Snackbar With Close';

  constructor(private _snackBarService: SnackbarService) {}

  openSnackBar(data: any, panelClass?: string, duration?: number) {
    duration = duration && duration !== null ? duration : 3000;
    this._snackBarService.openCustomSnackBar(data, duration, panelClass);
  }
}
