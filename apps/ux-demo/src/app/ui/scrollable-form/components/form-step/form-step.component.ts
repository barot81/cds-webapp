import { Component, Input } from '@angular/core';
import { ScrollableListService } from '@exxat/ux';
import { FormStep, FormStepStatusEnum } from '../../types';

@Component({
  selector: 'form-step',
  templateUrl: './form-step.component.html'
})
export class FormStepComponent {
  FormStepStatusEnum = FormStepStatusEnum;

  @Input() steps: Array<FormStep>;

  tooltipOptions = {
    contentType: 'string',
    trigger: 'hover',
    'max-width': '250',
    theme: 'light',
    pointerEvents: 'auto'
  };

  constructor(private scrollableListService: ScrollableListService) {}

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.offsetHeight < elem.scrollHeight;
    } else {
      return false;
    }
  }

  changeMenuItem(id: string) {
    this.scrollableListService.setCurrentMenuItem(id);
  }
}
