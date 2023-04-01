import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseNotesDemoAppRoutingModule } from './release-notes-demo-app-routing.module';
import { ReleaseNotesDemoAppPageComponent } from './pages/release-notes-demo-app-page/release-notes-demo-app-page.component';
import { AddReleaseNotesDrawerComponent } from './drawers/add-release-notes-drawer/add-release-notes-drawer.component';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReleaseNotesDemoAppDrawerService } from './release-notes-demo-app-drawer.service';
import { CKEditorModule } from '@exxat/plugin/ckeditor';

@NgModule({
  declarations: [ReleaseNotesDemoAppPageComponent, AddReleaseNotesDrawerComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    FuseSidebarModule,
    FlexLayoutModule,
    CKEditorModule,
    ReleaseNotesDemoAppRoutingModule,
  ],
  providers: [ReleaseNotesDemoAppDrawerService]
})
export class ReleaseNotesDemoAppModule { }
