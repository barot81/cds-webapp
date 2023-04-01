import { Component, OnInit } from '@angular/core';
import { TooltipDirective } from '@exxat/ux';
import { ExxatDrawerFormService } from '../../exxat-drawers/exxat-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-tooltip-inner',
  templateUrl: './tooltip-inner.component.html',
})
export class TooltipInnerComponent implements OnInit {
  constructor(
    public readonly exxatDrawerFormService: ExxatDrawerFormService,
    private readonly _tooltipDirective: TooltipDirective
  ) {}

  ngOnInit() {}

  public _onClick() {
    this._tooltipDirective.hide();
  }
}
