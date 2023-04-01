import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteDemoRoutingModule } from './site-demo-routing.module';
import { SiteDemoComponent } from './site-demo.component';
import { LocationComponent } from './tabs/location/location.component';
import { SiteNavbarComponent } from './site-navbar/site-navbar.component';
import {
  zhealthcareAvatarModule,
  MaterialModule,
  FuseSidebarModule,
  FuseSharedModule,
  zhealthcareTooltipModule,
} from '@zhealthcare/ux';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContractsComponent } from './tabs/contracts/contracts.component';
import { RoutingChecklistDrawerComponent } from './tabs/contracts/routing-checklist-drawer/routing-checklist-drawer.component';
import { SiteSecondarySideNavComponent } from './site-secondary-side-nav/site-secondary-side-nav.component';
import {ReactiveFormComponent} from "../reactive-form/reactive-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    SiteDemoComponent,
    LocationComponent,
    SiteNavbarComponent,
    ContractsComponent,
    RoutingChecklistDrawerComponent,
    SiteSecondarySideNavComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    SiteDemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    zhealthcareTagModule,
    zhealthcareAvatarModule,
    zhealthcareTooltipModule,
  ],
})
export class SiteDemoModule {}
