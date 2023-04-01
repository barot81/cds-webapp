import { NgModule } from '@angular/core';
import { Bootstrap } from '@exxat/bootstrap';
import { AppComponent } from './app.component';
@NgModule({
  imports: [Bootstrap],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
