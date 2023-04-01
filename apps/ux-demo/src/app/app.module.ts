import { NgModule } from '@angular/core';
import { Bootstrap } from '@zhealthcare/bootstrap';
import { AppComponent } from './app.component';
@NgModule({
  imports: [Bootstrap],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
