import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TagMaster } from '@exxat/profile/models';
import * as TagMasterActions from '../../actions/tag/tag-master.actions';

export interface TagMasterState extends EntityState<TagMaster> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const tagMasterAdapter: EntityAdapter<TagMaster> = createEntityAdapter<TagMaster>();

export const TagMasterInitialState: TagMasterState = tagMasterAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const tagMasterReducer = createReducer(
  TagMasterInitialState,
  on(TagMasterActions.LoadStudentTagMaster, (state: TagMasterState) => {
    return { ...state, loading: true };
  }),
  on(TagMasterActions.StudentTagMasterLoaded, (state: TagMasterState, { payload }) => {
    state = { ...state, loading: false };
    state = tagMasterAdapter.removeAll(state);
    if(payload){
      return tagMasterAdapter.addMany(payload, state)
    }
    else{
      return state;
    }
  }),
  on(TagMasterActions.StudentTagMasterLoadError, (state: TagMasterState, { payload }) => {
    return { ...state, loading: true };
  }),
  on(TagMasterActions.UpdateStudentTagMaster, (state: TagMasterState) => {
    return { ...state, saving: true };
  }),
  on(TagMasterActions.UpdateStudentTagMasterSuccess, (state: TagMasterState, { payload }) => {
    state = { ...state, saving: false };
    return tagMasterAdapter.updateOne(payload, state)
  }),
  on(TagMasterActions.AddStudentTagMaster, (state: TagMasterState) => {
    return { ...state, saving: true };
  }),
  on(TagMasterActions.AddStudentTagMasterSuccess, (state: TagMasterState, { payload }) => {
    state = { ...state, saving: false };
    return tagMasterAdapter.addOne(payload, state)
  }),
  on(TagMasterActions.DeleteStudentTagMaster, (state: TagMasterState) => {
    return { ...state, saving: true };
  }),
  on(TagMasterActions.DeleteStudentTagMasterSuccess, (state: TagMasterState, { payload }) => {
    state = { ...state, saving: false };
    return tagMasterAdapter.removeOne(payload, state)
  }),
);

export function TagMasterReducer(state: TagMasterState | undefined, action: Action) {
  return tagMasterReducer(state, action);
}
