import { NgModule } from '@angular/core';
import { ZhealthcareAngularBootstrapLegacyModule } from '@zhealthcare-common/angular-bootstrap-legacy';
import { AppComponent } from './app.component';
@NgModule({
  imports: [ZhealthcareAngularBootstrapLegacyModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
