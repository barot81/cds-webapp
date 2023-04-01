import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {
  zhealthcareTooltipModule,
  FuseDirectivesModule,
  FuseThemeOptionsModule,
  MaterialModule,
  SpecializedChipsModule
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ChipsDemoNavBarComponent } from './chips-demo-nav-bar/chips-demo-nav-bar.component';
import { ChipsDemoRoutingModule } from './chips-demo-routing.module';
import { ChipsDemoComponent } from './chips-demo/chips-demo.component';
import { ChipsSelectionFormComponent } from './chips-selection-form/chips-selection-form.component';
import { ChipsWithCustomInputComponent } from './chips-with-custom-input/chips-with-custom-input.component';
import { ChipsWithoutCustomInputComponent } from './chips-without-custom-input/chips-without-custom-input.component';
import { settingChipDemoComponent } from './setting-chip-demo/setting-chip-demo.component';
import { SpecializedChipDemoComponent } from './specialized-chip-demo/specialized-chip-demo.component';

@NgModule({
  declarations: [
    ChipsDemoComponent,
    ChipsWithoutCustomInputComponent,
    ChipsWithCustomInputComponent,
    ChipsDemoNavBarComponent,
    settingChipDemoComponent,
    SpecializedChipDemoComponent,
    ChipsSelectionFormComponent
  ],
  imports: [
    CommonModule,
    ChipsDemoRoutingModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FuseHighlightModule,
    MatCardModule,
    FlexLayoutModule,
    FuseThemeOptionsModule,
    FuseDirectivesModule,
    zhealthcareTooltipModule,
    SpecializedChipsModule,
  ],
})
export class ChipsDemoModule {}
