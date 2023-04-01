import { Component, ViewChildren } from '@angular/core';
import { TooltipDirective } from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';
import { zhealthcareDrawerFormService } from '../../../zhealthcare-drawers/zhealthcare-drawer-forms-shared.service';

@Component({
  selector: 'ryzen-tooltip-example-two',
  templateUrl: './tooltip-example-two.component.html'
})
export class TooltipExampleTwoComponent {

  @ViewChildren(TooltipDirective) tooltipDirective;
  zhealthcareTooltip: any;
  toolTipOpened = new BehaviorSubject<boolean>(false);
  tooltipOptions = {
    'contentType': 'template',
    'placement': 'right',
    'trigger': 'click',
    'theme': 'light',
    'max-width': '450',
    'width': '450',
    'hide-delay': -1,
    'pointerEvents': 'auto'
  }

  constructor(public readonly zhealthcareDrawerFormService: zhealthcareDrawerFormService) { }


  //#region [Tooltip Handlers]

  // Function is to open tooltip
  // openTooltip(id: any) {
  //   this.zhealthcareTooltip = this.tooltipDirective.find(elem => elem.id === id);
  //   if (this.tooltipDirective && this.tooltipDirective != null && this.tooltipDirective.length > 0) {
  //     let filteredTooltips: Array<any> = this.tooltipDirective.filter(x => x.createTimeoutId != null && x.id != this.zhealthcareTooltip.id);
  //     filteredTooltips.forEach(element => {
  //       element.destroyTooltip();
  //     });
  //   }

  //   this.toolTipOpened.next(true);
  // }

  // Function will execute when user click outside of tooltip
  // onOutsideClick() {
  //   if (this.zhealthcareTooltip && this.zhealthcareTooltip != null) {
  //     this.zhealthcareTooltip.destroyTooltip();
  //   }
  //   this.toolTipOpened.next(false);
  // }

  //#endregion
}
