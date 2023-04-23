import { NgModule } from '@angular/core';
import { ZhealthcareAngularBootstrapLegacyModule } from '@zhealthcare-common/angular-bootstrap';
import { AppComponent } from './app.component';
import { UxDemoModule } from './remote-entry/ux-demo.module';
import { UIModule } from './ui/ui.module';
@NgModule({
  imports: [
    ZhealthcareAngularBootstrapLegacyModule,
    UxDemoModule,
    UIModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
