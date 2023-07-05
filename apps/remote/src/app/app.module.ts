import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./remote-entry/entry.module').then(
              (m) => m.RemoteEntryModule
            ),
          // canActivate: [MsalGuard]
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
