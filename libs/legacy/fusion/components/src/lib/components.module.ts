import { NgModule } from '@angular/core';
import { DelegatorComponent } from './delegate/delegator.component';
import { SecurityContextComponent } from './security/securityContext.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RedirectionComponent } from './redirection/redirection.component';
import { UserConsentComponent } from './user-consent/user-consent.component';
import { zhealthcareAgreementComponent } from './user-consent/zhealthcare-agreement/zhealthcare-agreement.component';
import { VersionCheckConfirmationDialog } from './version-check/version-confirm-dialog.component';
import { FeatureMetaDataPipesModule } from '@zhealthcare/fusion/pipes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DelegatorComponent,
    SecurityContextComponent,
    RedirectionComponent,
    UserConsentComponent,
    zhealthcareAgreementComponent,
    VersionCheckConfirmationDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    FeatureMetaDataPipesModule,
  ],
  exports: [SecurityContextComponent, RedirectionComponent],
})
export class ComponentsModule {}
