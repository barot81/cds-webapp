import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarDemoComponent } from './snackbar-demo/snackbar-demo.component';
import { SnackbarExampleOneComponent } from './examples/snackbar-example-one/snackbar-example-one.component';
import { SnackbarExampleTwoComponent } from './examples/snackbar-example-two/snackbar-example-two.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MaterialModule,
  zhealthcareSnackBarModule,
  FuseThemeOptionsModule,
} from '@zhealthcare/ux';
import { SnackBarDemoRoutingModule } from './snackbar-demo/snack-bar-demo-routing.module';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarWithoutActionComponent } from './examples/snackbar-without-action/snackbar-without-action.component';
import { SnackbarWithWarnBgComponent } from './examples/snackbar-with-warn-bg/snackbar-with-warn-bg.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    SnackbarDemoComponent,
    SnackbarExampleOneComponent,
    SnackbarExampleTwoComponent,
    SnackbarWithoutActionComponent,
    SnackbarWithWarnBgComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SnackBarDemoRoutingModule,
    FuseHighlightModule,
    MatSnackBarModule,
    FuseThemeOptionsModule,
    zhealthcareSnackBarModule,
  ],
})
export class SnackbarDemoModule {}
