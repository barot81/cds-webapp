import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthGuardService, loadRemoteModuleFromDefinitions } from '@zhealthcare/fusion/core';

@NgModule({
  declarations: [RemoteEntryComponent, NxWelcomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
      },
      {
        path: 'ux',
        loadChildren: () =>
          loadRemoteModuleFromDefinitions(
            'ux-demo',
            './UxDemoModule',
            'UxDemoModule'
          ),
        canActivate: [AuthGuardService],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
