import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessibilityOwnershipChartComponent } from './accessibility-ownership-chart/accessibility-ownership-chart.component';
import { ExxatAccessibilityComponent } from './exxat-accessibility/exxat-accessibility.component';
import { QaAccessibilityChecklistComponent } from './qa-accessibility-checklist/qa-accessibility-checklist.component';

const routes: Routes = [{
  path: 'exxat-accessibility',
  component: ExxatAccessibilityComponent
},
{
  path: 'qa-accessibility-checklist',
  component: QaAccessibilityChecklistComponent
},
{
  path:'accessibility-ownership-chart',
  component: AccessibilityOwnershipChartComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExxatAccessibilityRoutingModule { }
