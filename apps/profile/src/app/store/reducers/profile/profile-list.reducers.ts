import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProfileList } from '@exxat/profile/models';
import * as ProfileListActions from '../../actions/profile/profile-list.actions';
import { Logger } from '@exxat/fusion/core';


export interface ProfileListState extends EntityState<any> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
  count: number | null;
}

export const profileListAdapter: EntityAdapter<any> =
  createEntityAdapter<ProfileList>();

export const ProfileListInitialState: ProfileListState =
  profileListAdapter.getInitialState({
    selectedId: null,
    loading: false,
    saving: false,
    count: null,
  });

const profileListReducer = createReducer(
  ProfileListInitialState,
  on(ProfileListActions.LoadProfileList, (state: ProfileListState) => {
    Logger.trace(
      `StudentModule : LoadProfileList action called in ProfileListReducer`
    );
    return { ...state, loading: true };
  }),
  on(
    ProfileListActions.ProfileListLoaded,
    (state: ProfileListState, { payload }) => {
      Logger.trace(
        `StudentModule : ProfileListLoaded action called in ProfileListReducer`
      );
      state = { ...state, loading: false, count: payload.count };
      if (payload?.result) {
        state=profileListAdapter.removeAll(state);
        return profileListAdapter.addMany(payload?.result, state);
      } else {
        return state;
      }
    }
  ),
  on(ProfileListActions.DistroyProfileList, (state: ProfileListState) => {
    Logger.trace(
      `StudentModule : DistroyProfileList action called in ProfileListReducer`
    );
    return profileListAdapter.removeAll(state);
  }),
  on(
    ProfileListActions.PatchProfileList,
    (state: ProfileListState, { payload }) => {
      Logger.trace(
        `StudentModule : PatchProfileList action called in ProfileListReducer`
      );
      const existingData = {
        ...state?.entities[payload.id],
      };
      existingData.firstName = payload.firstName;
      existingData.lastName = payload.lastName;
      existingData.fileCollectionKey = payload.fileCollectionKey;
      existingData.tagIds = payload.tagIds;
      state = { ...state, saving: false };
      return profileListAdapter.updateOne(
        {
          id: payload.id,
          changes: existingData,
        },
        state
      );
    }
  )
);

export function ProfileListReducer(
  state: ProfileListState | undefined,
  action: Action
) {
  return profileListReducer(state, action);
}
