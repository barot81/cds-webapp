import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FullScreenService {
  private fullScreenModeEnabled = new BehaviorSubject<boolean>(false);
  public fullScreenModeEnabled$ = this.fullScreenModeEnabled.asObservable();

  //#region [PUBLIC FUNCTIONS]

  public get getFullScreenModeEnabled(): boolean {
    return this.fullScreenModeEnabled.value;
  }

  public setFullScreenModeEnabled(value: boolean): void {
    this.fullScreenModeEnabled.next(value);
  }
  //#endregion
}
