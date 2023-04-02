import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { OverlayContainerComponent } from './components';
import { OverlayActionDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    MaterialModule,
    A11yModule,
    PortalModule,
  ],
  declarations: [OverlayContainerComponent, OverlayActionDirective],
  exports: [OverlayActionDirective],
})
export class DynamicOverlayModule {}
