import { Injectable } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { BehaviorSubject } from 'rxjs';

import { ThemeSelectionComponent } from '../components/theme-selection.component';

@Injectable({ providedIn: 'any' })
export class ThemeSelectionService extends ComponentMap {
  selectedThemeColor$: BehaviorSubject<string>;

  /**
   *
   */
  constructor() {
    super();
    this.selectedThemeColor$ = new BehaviorSubject(null);
    this.add('exxat-theme-selection', ThemeSelectionComponent);
  }
}
