import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthService,
  zhealthcareAngularOuthOIDCModule,
} from '@zhealthcare-core/angular-oauth-oidc';
import {
  zhealthcareAngularRuntimeConfigModule,
  RuntimeConfigLoaderService,
} from '@zhealthcare-core/angular-runtime-config';
import { zhealthcareAngularMfModule } from '@zhealthcare-core/angular-mf';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { fetchRuntimeConfigFactory } from './config/appinit-factory';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    MatDialogModule,
    MatSnackBarModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    zhealthcareAngularOuthOIDCModule.forRoot(),
    zhealthcareAngularRuntimeConfigModule,
    zhealthcareAngularMfModule,
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: true,
    }),
    AppRoutingModule,
  ],
  providers: [
    RuntimeConfigLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: fetchRuntimeConfigFactory,
      deps: [HttpClient, RuntimeConfigLoaderService, AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
