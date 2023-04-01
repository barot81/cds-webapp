import { Component, OnInit } from '@angular/core';
import { TooltipDirective } from '@zhealthcare/ux';
import { zhealthcareDrawerFormService } from '../../zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-tooltip-inner',
  templateUrl: './tooltip-inner.component.html',
})
export class TooltipInnerComponent implements OnInit {
  constructor(
    public readonly zhealthcareDrawerFormService: zhealthcareDrawerFormService,
    private readonly _tooltipDirective: TooltipDirective
  ) {}

  ngOnInit() {}

  public _onClick() {
    this._tooltipDirective.hide();
  }
}
