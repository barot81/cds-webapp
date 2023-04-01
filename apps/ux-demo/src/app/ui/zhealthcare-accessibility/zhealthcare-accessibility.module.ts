import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { zhealthcareAccessibilityRoutingModule } from './zhealthcare-accessibility-routing.module';
import { zhealthcareAccessibilityComponent } from './zhealthcare-accessibility/zhealthcare-accessibility.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QaAccessibilityChecklistComponent } from './qa-accessibility-checklist/qa-accessibility-checklist.component';
import { AccessibilityOwnershipChartComponent } from './accessibility-ownership-chart/accessibility-ownership-chart.component';

@NgModule({
  declarations: [zhealthcareAccessibilityComponent, QaAccessibilityChecklistComponent, AccessibilityOwnershipChartComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    zhealthcareAccessibilityRoutingModule
  ]
})
export class zhealthcareAccessibilityModule { }
