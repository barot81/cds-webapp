import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'account/register',
    loadChildren: () =>
      import('@zhealthcare/account/registration').then((m) => m.RegistrationModule),
  }
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  relativeLinkResolution: 'legacy',
  initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
  declarations: [],
})
export class zhealthcareBootstrapLegacyRoutingModule { }
