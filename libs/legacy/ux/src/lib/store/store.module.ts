import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material.module';
import { SnackbarService } from '../services/snackbar.service';
import { effects } from './effects/uistate.effects';
import { PageFacade } from './facade/page.facade';
import { RouterStateFacade } from './facade/router.facade';
import { CustomSerializer } from './reducers/router.reducers';
import { reducers } from './reducers/uistate.reducers';
import { provideBootstrapEffects } from './utils';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature('ui', reducers),
    EffectsModule.forFeature([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      serializer: CustomSerializer,
    }),
  ],
  providers: [
    RouterStateFacade,
    PageFacade,
    SnackbarService,
    provideBootstrapEffects(effects),
  ],
})
export class UXStoreModule {}
