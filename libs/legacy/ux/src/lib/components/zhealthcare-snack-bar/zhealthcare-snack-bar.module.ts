import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarWithCloseComponent } from './components/snack-bar-with-close/snack-bar-with-close.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SnackbarService } from '../../services/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [SnackBarWithCloseComponent, CustomSnackbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  providers: [SnackbarService],
  exports: [SnackBarWithCloseComponent, CustomSnackbarComponent]
})
export class zhealthcareSnackBarModule { }
