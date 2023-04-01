import { Component, OnInit } from '@angular/core';
import { zhealthcareDrawerFormService } from '../../zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-drawer-with-sticky-buttons-container',
  templateUrl: './drawer-with-sticky-buttons-container.component.html'
})
export class DrawerWithStickyButtonsContainerComponent implements OnInit {

  constructor(public zhealthcareDrawerFormService: zhealthcareDrawerFormService) { }

  ngOnInit() {
  }

}
