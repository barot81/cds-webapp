import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExxatFileViewerGuidelineOverlayDemoComponent } from './examples/exxat-file-viewer-guideline-overlay-demo/exxat-file-viewer-guideline-overlay-demo.component';
import { ExxatFileViewerOverlayDemoComponent } from './examples/exxat-file-viewer-overlay-demo/exxat-file-viewer-overlay-demo.component';
import { FileViewerOverlayDemo3Component } from './examples/file-viewer-overlay-demo3/file-viewer-overlay-demo3.component';
import { OverlayComponentExampleComponent } from './examples/overlay-component-example/overlay-component-example.component';
import { ExxatOverlayDemoComponent } from './exxat-overlay-demo.component';
import { FileViewerOverlayDemo3ContainerComponent } from './file-viewer-overlay-demo3-container/file-viewer-overlay-demo3-container.component';

const routes: Routes = [
  {
    path: 'exxat-overlay',
    component: ExxatOverlayDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'file-viewer-guideline',
        pathMatch: 'full',
      },
      {
        path: 'file-viewer-guideline',
        component: ExxatFileViewerGuidelineOverlayDemoComponent,
      },
      {
        path: 'file-viewer',
        component: ExxatFileViewerOverlayDemoComponent,
      },
      {
        path: 'component',
        component: OverlayComponentExampleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExxatOverlayDemoRoutingModule {}
