import { Component } from '@angular/core';
import { zhealthcareDrawerFormService } from '../../../zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'zhealthcare-filter-example',
  templateUrl: './filter-example.component.html',
})
export class FilterExampleComponent {
  constructor(public _zhealthcareDrawerFormService: zhealthcareDrawerFormService) {}
}
