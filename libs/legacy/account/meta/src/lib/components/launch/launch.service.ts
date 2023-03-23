import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LaunchService {
  tenantAppExistSubject = new BehaviorSubject(null);

  constructor() {}
}
