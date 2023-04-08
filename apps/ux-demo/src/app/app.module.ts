import { NgModule } from '@angular/core';
import { ZhealthcareAngularBootstrapLegacyModule } from '@zhealthcare-common/angular-bootstrap-legacy';
import { AppComponent } from './app.component';
import { UxDemoModule } from './remote-entry/ux-demo.module';
@NgModule({
  imports: [
    ZhealthcareAngularBootstrapLegacyModule,
    UxDemoModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
