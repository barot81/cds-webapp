import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChipsDemoComponent } from './chips-demo/chips-demo.component';
import { ChipsSelectionFormComponent } from './chips-selection-form/chips-selection-form.component';
import { ChipsWithCustomInputComponent } from './chips-with-custom-input/chips-with-custom-input.component';
import { ChipsWithoutCustomInputComponent } from './chips-without-custom-input/chips-without-custom-input.component';
import { settingChipDemoComponent } from './setting-chip-demo/setting-chip-demo.component';
import { SpecializedChipDemoComponent } from './specialized-chip-demo/specialized-chip-demo.component';
const routes: Routes = [
  {
    path: 'chips-demo',
    component: ChipsDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'chips-with-custom-input',
        pathMatch: 'full',
      },
      {
        path: 'chips-with-custom-input',
        component: ChipsWithCustomInputComponent,
      },
      {
        path: 'chips-without-custom-input',
        component: ChipsWithoutCustomInputComponent,
      },
      {
        path: 'setting-chip-demo',
        component: settingChipDemoComponent,
      },
      {
        path: 'specialized-chip',
        component: SpecializedChipDemoComponent,
      },
      {
        path: 'chips-selection-form',
        component: ChipsSelectionFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChipsDemoRoutingModule {}
