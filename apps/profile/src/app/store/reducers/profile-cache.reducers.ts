import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProfileCache } from '@exxat/profile/models';
import lodash from 'lodash';

import * as studentProfileCacheActions from '../actions/profile-cache.actions';

export interface StudentProfileCacheState extends EntityState<ProfileCache> {
  loading :boolean;
 }

export const studentProfileCacheAdapter: EntityAdapter<ProfileCache> = createEntityAdapter<ProfileCache>();

export const ProfileCacheAdapterInitialState: StudentProfileCacheState = studentProfileCacheAdapter.getInitialState({
  loading: false
});

const studentProfileCacheReducer = createReducer(
  ProfileCacheAdapterInitialState,
  on(studentProfileCacheActions.UpdateLoadedEntityInCache, (state: StudentProfileCacheState, { payload, entity }) => {
    if (state.ids?.length === 0 || !(state.ids.some(x => x === payload))) {
      const studentProfileCache = new ProfileCache();
      studentProfileCache[entity] = true;
      studentProfileCache.id = payload;
      return studentProfileCacheAdapter.addOne(studentProfileCache, state);
    } else {
      const entities = lodash.cloneDeep(state.entities);
      const cachedEntity = entities[payload];
      cachedEntity[entity] = true;
      return studentProfileCacheAdapter.upsertOne(cachedEntity, state)
    }
  }),
);

export function ProfileCacheReducer(state: StudentProfileCacheState | undefined, action: Action) {
  return studentProfileCacheReducer(state, action);
}
