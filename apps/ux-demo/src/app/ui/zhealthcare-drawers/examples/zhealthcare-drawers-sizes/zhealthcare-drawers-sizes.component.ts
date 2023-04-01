import { Component, OnInit } from '@angular/core';
import { zhealthcareDrawerFormService } from '../../zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-zhealthcare-drawers-sizes',
  templateUrl: './zhealthcare-drawers-sizes.component.html',
  styleUrls: ['./zhealthcare-drawers-sizes.component.scss']
})
export class zhealthcareDrawersSizesComponent implements OnInit {

  constructor(public zhealthcareDrawerFormService: zhealthcareDrawerFormService) { }

  ngOnInit() {
  }

}
