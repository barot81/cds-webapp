import { Component, ViewChildren } from '@angular/core';
import { TooltipDirective } from '@exxat/ux';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'ryzen-tooltip-example-four',
    templateUrl: './tooltip-example-four.component.html'
})
export class TooltipExampleFourComponent {
    @ViewChildren(TooltipDirective) tooltipDirective;
    exxatTooltip: any;
    toolTipOpened = new BehaviorSubject<boolean>(false);
    tooltipOptions = {
        'contentType': 'template',
        'placement': 'right',
        'trigger': 'click',
        'theme': 'light',
        'max-width': '470',
        'pointerEvents': 'auto'
    }

    //#region [Tooltip Handlers]

    // Function is to open tooltip
    openTooltip(id: any) {
        this.exxatTooltip = this.tooltipDirective.find(elem => elem.id === id);
        if (this.tooltipDirective && this.tooltipDirective != null && this.tooltipDirective.length > 0) {
            let filteredTooltips: Array<any> = this.tooltipDirective.filter(x => x.createTimeoutId != null && x.id != this.exxatTooltip.id);
            filteredTooltips.forEach(element => {
                element.destroyTooltip();
            });
        }

        this.toolTipOpened.next(true);
    }

    // Function will execute when user click outside of tooltip
    onOutsideClick() {
        if (this.exxatTooltip && this.exxatTooltip != null) {
            this.exxatTooltip.destroyTooltip();
        }
        this.toolTipOpened.next(false);
    }

    //#endregion

}