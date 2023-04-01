import { Component, OnInit } from '@angular/core';
import { ExxatDrawerFormService } from '../../exxat-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-exxat-drawers-sizes',
  templateUrl: './exxat-drawers-sizes.component.html',
  styleUrls: ['./exxat-drawers-sizes.component.scss']
})
export class ExxatDrawersSizesComponent implements OnInit {

  constructor(public exxatDrawerFormService: ExxatDrawerFormService) { }

  ngOnInit() {
  }

}
