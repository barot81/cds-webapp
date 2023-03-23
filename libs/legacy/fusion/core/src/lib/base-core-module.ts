import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RealtimeService } from './asyncServices/communication/realtime.service';
import { HttpServiceModule } from './asyncServices/http/http.module';
import { HttpResponseHandler } from './asyncServices/http/httpResponseHandler.service';
import { EventsModule } from './event/events.module';
import { AuthSandbox } from './services/auth/auth.sandbox';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/auth/user.service';
import { UserTypeService } from './services/auth/user.type.service';
import {
  ComponentFactoryService,
  PasswordStrengthService,
  ReferenceAreaDirective,
  UtilityModule,
} from './services/index';
import { GlobalErrorHandler } from './services/logger/global-error.service';
import { LoggingService } from './services/logger/logging.service';
import { AppstoreModule } from './store/Appstore.module';

import { A11yModule } from '@angular/cdk/a11y';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FusionCustomSnackbarComponent } from './component/custom-snackbar/custom-snackbar.component';
import { DelegatorSessionTimeoutComponent } from './component/session-timeout/delegator-session-timeout/delegator-session-timeout.component';
import { SessionLoggedoutDialogComponent } from './component/session-timeout/session-loggedout-dialog/session-loggedout-dialog.component';
import { SessionTimeoutDialogComponent } from './component/session-timeout/session-timeout-dialog/session-timeout-dialog.component';
import { BaseSessionTimeoutComponent } from './component/session-timeout/session-timeout.component';
import { MsalService } from './services/auth/msal.service';
import { UserConsentApiClient } from './services/user-consent/user-consent.apiClient.service';
import { UserConsentSandbox } from './services/user-consent/user-consent.sandbox';

@NgModule({
  declarations: [
    ReferenceAreaDirective,
    FusionCustomSnackbarComponent,
    BaseSessionTimeoutComponent,
    SessionTimeoutDialogComponent,
    SessionLoggedoutDialogComponent,
    DelegatorSessionTimeoutComponent,
  ],
  imports: [
    CommonModule,
    AppstoreModule,
    EventsModule,
    HttpServiceModule,
    UtilityModule,
    HttpClientModule,
    A11yModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [
    ReferenceAreaDirective,
    AppstoreModule,
    EventsModule,
    HttpServiceModule,
    UtilityModule,
    SessionTimeoutDialogComponent,
  ],
  providers: [
    AuthService,
    UserService,
    AuthSandbox,
    HttpResponseHandler,
    ComponentFactoryService,
    RealtimeService,
    MsalService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    LoggingService,
    UserConsentSandbox,
    UserConsentApiClient,
    PasswordStrengthService,
    UserTypeService,
  ],
  entryComponents: [SessionTimeoutDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BaseCoreModule {}
