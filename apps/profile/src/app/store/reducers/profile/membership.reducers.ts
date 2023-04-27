import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Membership } from '@exxat/profile/models';
import * as MembershipActions from '../../actions/profile/membership.actions';
import { Logger } from '@exxat/fusion/core';

export interface MembershipState extends EntityState<Membership> {
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
}

export const membershipAdapter: EntityAdapter<Membership> = createEntityAdapter<Membership>();

export const MembershipInitialState: MembershipState = membershipAdapter.getInitialState({
  selectedId: null,
  loading: false,
  saving: false
});

const membershipReducer = createReducer(
  MembershipInitialState,
  on(MembershipActions.LoadMembership, (state: MembershipState) => {
    Logger.trace(`StudentModule : LoadMembership action called in MembershipReducer`);
    return { ...state, loading: true };
  }),
  on(MembershipActions.MembershipLoaded, (state: MembershipState, { payload }) => {
    Logger.trace(`StudentModule : MembershipLoaded action called in MembershipReducer`);
    state = { ...state, loading: false };
    if (payload) {
      return membershipAdapter.addMany(payload, state);
    }else{
      return state;
    }
  }),
  on(MembershipActions.MembershipLoadError, (state: MembershipState, { payload }) => {
    Logger.trace(`StudentModule : MembershipLoadError action called in MembershipReducer`);
    return { ...state, loading: true };
  }),
  on(MembershipActions.UpdateMembership, (state: MembershipState) => {
    Logger.trace(`StudentModule : UpdateMembership action called in MembershipReducer`);
    return { ...state, saving: true };
  }),
  on(MembershipActions.UpdateMembershipSuccess, (state: MembershipState, { payload }) => {
    Logger.trace(`StudentModule : UpdateMembershipSuccess action called in MembershipReducer`);
    state = { ...state, saving: false };
    return membershipAdapter.updateOne(payload, state)
  }),
  on(MembershipActions.AddMembership, (state: MembershipState) => {
    Logger.trace(`StudentModule : AddMembership action called in MembershipReducer`);
    return { ...state, saving: true };
  }),
  on(MembershipActions.AddMembershipSuccess, (state: MembershipState, { payload }) => {
    Logger.trace(`StudentModule : AddMembershipSuccess action called in MembershipReducer`);
    state = { ...state, saving: false };
    return membershipAdapter.addOne(payload, state)
  }),
  on(MembershipActions.DeleteMembership, (state: MembershipState) => {
    Logger.trace(`StudentModule : DeleteMembership action called in MembershipReducer`);
    return { ...state, saving: true };
  }),
  on(MembershipActions.DeleteMembershipSuccess, (state: MembershipState, { payload }) => {
    state = { ...state, saving: false };
    Logger.trace(`StudentModule : DeleteMembershipSuccess action called in MembershipReducer`);
    return membershipAdapter.removeOne(payload, state)
  }),
);

export function MembershipReducer(state: MembershipState | undefined, action: Action) {
  return membershipReducer(state, action);
}
