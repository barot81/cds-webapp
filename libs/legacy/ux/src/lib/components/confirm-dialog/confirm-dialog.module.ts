import { NgModule } from '@angular/core';

import { FuseConfirmDialogComponent } from './confirm-dialog.component';
import { FuseSharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';
import { ConfirmDialogService } from './confirm-dialog.service';

@NgModule({
  declarations: [
    FuseConfirmDialogComponent
  ],
  imports: [
    MaterialModule,
    FuseSharedModule
  ],
  providers: [ConfirmDialogService]
})
export class FuseConfirmDialogModule {
}
