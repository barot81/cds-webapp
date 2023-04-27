import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './effects/profile-map.effects';
import { reducers } from './reducers';
import { ProfileFacadeModule } from './facade/facade.module';
import { ProfileFacade } from './facade/profile.facade';
import { ProfileServicesModule } from '@exxat/profile/services';
import { ProfileCacheFacade } from './facade/profile-cache.facade';

@NgModule({
  imports: [
    ProfileServicesModule,
    ProfileFacadeModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [ProfileFacade, ProfileCacheFacade]
})
export class StudentProfileStoreModule { }
