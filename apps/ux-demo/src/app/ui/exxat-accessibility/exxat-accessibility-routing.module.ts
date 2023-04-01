import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessibilityOwnershipChartComponent } from './accessibility-ownership-chart/accessibility-ownership-chart.component';
import { zhealthcareAccessibilityComponent } from './zhealthcare-accessibility/zhealthcare-accessibility.component';
import { QaAccessibilityChecklistComponent } from './qa-accessibility-checklist/qa-accessibility-checklist.component';

const routes: Routes = [{
  path: 'zhealthcare-accessibility',
  component: zhealthcareAccessibilityComponent
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
export class zhealthcareAccessibilityRoutingModule { }
