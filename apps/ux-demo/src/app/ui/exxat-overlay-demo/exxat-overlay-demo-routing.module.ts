import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareFileViewerGuidelineOverlayDemoComponent } from './examples/zhealthcare-file-viewer-guideline-overlay-demo/zhealthcare-file-viewer-guideline-overlay-demo.component';
import { zhealthcareFileViewerOverlayDemoComponent } from './examples/zhealthcare-file-viewer-overlay-demo/zhealthcare-file-viewer-overlay-demo.component';
import { FileViewerOverlayDemo3Component } from './examples/file-viewer-overlay-demo3/file-viewer-overlay-demo3.component';
import { OverlayComponentExampleComponent } from './examples/overlay-component-example/overlay-component-example.component';
import { zhealthcareOverlayDemoComponent } from './zhealthcare-overlay-demo.component';
import { FileViewerOverlayDemo3ContainerComponent } from './file-viewer-overlay-demo3-container/file-viewer-overlay-demo3-container.component';

const routes: Routes = [
  {
    path: 'zhealthcare-overlay',
    component: zhealthcareOverlayDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'file-viewer-guideline',
        pathMatch: 'full',
      },
      {
        path: 'file-viewer-guideline',
        component: zhealthcareFileViewerGuidelineOverlayDemoComponent,
      },
      {
        path: 'file-viewer',
        component: zhealthcareFileViewerOverlayDemoComponent,
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
export class zhealthcareOverlayDemoRoutingModule {}
