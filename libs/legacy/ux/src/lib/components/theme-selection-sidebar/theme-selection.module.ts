import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ThemeSelectionComponent } from './components/theme-selection.component';
import { ThemeSelectionService } from './services';

@NgModule({
  declarations: [ThemeSelectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [ThemeSelectionService],
})
export class ThemeSelectionModule {}
