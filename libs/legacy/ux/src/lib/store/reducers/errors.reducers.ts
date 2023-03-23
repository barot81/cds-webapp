import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as errorActions from '../actions/error.actions';
import { Error } from '../error.model';

export interface ErrorState extends EntityState<Error> {
  errorId: string;
}

export const errorAdapter: EntityAdapter<Error> = createEntityAdapter<Error>();

export const errorInitialState: ErrorState = errorAdapter.getInitialState({
  errorId: null,
});

const errorReducer = createReducer(
  errorInitialState,
  on(errorActions.AddError, (state, { source, payload }) => {
    const error = new Error();
    error.source = source;
    error.message = payload.message;
    error.name = payload.name;
    error.status = payload.status;
    error.statusText = payload.statusText;
    error.url = payload.url;
    return errorAdapter.addOne(error, state);
  }),
  on(errorActions.ClearError, (state, { payload }) => {
    return errorAdapter.removeOne(payload, state);
  })
);

export function ErrorReducer(state: ErrorState | undefined, action: Action) {
  return errorReducer(state, action);
}
