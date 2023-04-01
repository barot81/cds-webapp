import { Component, OnInit } from '@angular/core';
import { ExxatDrawerFormService } from '../../exxat-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-drawer-with-cards-container',
  templateUrl: './drawer-with-cards-container.component.html',
  styleUrls: ['./drawer-with-cards-container.component.scss']
})
export class DrawerWithCardsContainerComponent implements OnInit {

  constructor(public _exxatDrawerFormService: ExxatDrawerFormService) { }

  ngOnInit() {
  }

}
