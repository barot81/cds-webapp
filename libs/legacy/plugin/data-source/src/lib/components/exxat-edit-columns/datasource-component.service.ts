import { Injectable} from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { ExxatDisplayColumnsFormComponent } from '../exxat-display-columns-form/exxat-display-columns-form.component';

@Injectable({ providedIn: 'any'})
export class DataSourceComponentService extends ComponentMap {

  constructor() {
    super();
    this.add('exxat-display-columns-form', ExxatDisplayColumnsFormComponent);
    // this.add('ryzen-rotation-drawer', RotationDrawerComponent);
    // this.add('ryzen-routing-checklist-drawer', RoutingChecklistDrawerComponent);
  }
}
