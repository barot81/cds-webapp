import { Component } from '@angular/core';
import { ExxatDrawerFormService } from '../../../exxat-drawers/exxat-drawer-forms-shared.service';

@Component({
  selector: 'exxat-filter-example',
  templateUrl: './filter-example.component.html',
})
export class FilterExampleComponent {
  constructor(public _exxatDrawerFormService: ExxatDrawerFormService) {}
}
