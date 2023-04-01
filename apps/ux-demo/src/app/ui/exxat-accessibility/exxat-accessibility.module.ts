import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExxatAccessibilityRoutingModule } from './exxat-accessibility-routing.module';
import { ExxatAccessibilityComponent } from './exxat-accessibility/exxat-accessibility.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QaAccessibilityChecklistComponent } from './qa-accessibility-checklist/qa-accessibility-checklist.component';
import { AccessibilityOwnershipChartComponent } from './accessibility-ownership-chart/accessibility-ownership-chart.component';

@NgModule({
  declarations: [ExxatAccessibilityComponent, QaAccessibilityChecklistComponent, AccessibilityOwnershipChartComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ExxatAccessibilityRoutingModule
  ]
})
export class ExxatAccessibilityModule { }
