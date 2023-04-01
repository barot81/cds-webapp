import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'any'})
export class LayoutScrollService {
  mainHeaderHeight: number;
  contentHeaderOneHeight: number;
}
