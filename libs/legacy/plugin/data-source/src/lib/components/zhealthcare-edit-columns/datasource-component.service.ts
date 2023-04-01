import { Injectable} from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { zhealthcareDisplayColumnsFormComponent } from '../zhealthcare-display-columns-form/zhealthcare-display-columns-form.component';

@Injectable({ providedIn: 'any'})
export class DataSourceComponentService extends ComponentMap {

  constructor() {
    super();
    this.add('zhealthcare-display-columns-form', zhealthcareDisplayColumnsFormComponent);
    // this.add('ryzen-rotation-drawer', RotationDrawerComponent);
    // this.add('ryzen-routing-checklist-drawer', RoutingChecklistDrawerComponent);
  }
}
