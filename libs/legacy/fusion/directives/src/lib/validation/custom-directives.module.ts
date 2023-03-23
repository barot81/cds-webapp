
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { ControlErrorsDirective } from './control-errors.directive';
import { ControlContainer } from '@angular/forms';
import { ControlErrorComponent } from './control-error/control-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export function controlContainerFactory(controlContainer?: ControlContainer) {
  return controlContainer;
}

@NgModule({
  declarations: [ControlErrorContainerDirective, ControlErrorsDirective, ControlErrorComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  providers: [
  ],
  exports: [ControlErrorContainerDirective, ControlErrorsDirective]
})
export class CustomDirectiveModule { }
