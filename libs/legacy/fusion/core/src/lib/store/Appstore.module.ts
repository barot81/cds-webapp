
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrgFacade } from './facades/org.facade';
import { AuthEffects } from './effects/user.effects';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideBootstrapEffects } from './utils';
import { reducers } from './selectors/app.states';
import { clearState } from './reducers/meta.reducer';
import { UserFacade } from './facades/user.facade';

export const metaReducers: MetaReducer[] = [clearState];
@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("fusion",reducers,{ metaReducers}),
        EffectsModule.forFeature([]),
    ],
    providers: [
        OrgFacade,
        UserFacade,
        provideBootstrapEffects([
            AuthEffects
        ]),
    ],
    declarations: [],
    exports: []
})
export class AppstoreModule {
 }
