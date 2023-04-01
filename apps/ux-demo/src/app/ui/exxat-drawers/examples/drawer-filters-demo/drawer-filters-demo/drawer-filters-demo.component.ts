import { Component, OnInit } from '@angular/core';
import { ExxatDrawerFormService } from '../../../exxat-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-drawer-filters-demo',
  templateUrl: './drawer-filters-demo.component.html',
  styleUrls: ['./drawer-filters-demo.component.scss']
})
export class DrawerFiltersDemoComponent implements OnInit {

  constructor(public _exxatDrawerFormService: ExxatDrawerFormService) { }

  ngOnInit() {
  }

}
