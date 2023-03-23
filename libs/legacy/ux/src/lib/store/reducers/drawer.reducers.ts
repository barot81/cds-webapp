import { Action, createReducer, on, State } from '@ngrx/store';
import * as drawerActions from '../actions/drawer.actions';

export interface DrawerState {
  actionProgressState: boolean
}

const initialDrawerState: DrawerState = {
  actionProgressState: false
};

const drawerReducer = createReducer(
  initialDrawerState,
  on(drawerActions.CloseDrawer, state => state),
  on(drawerActions.CloseDrawerWithSnackBarMessage, state => state),
  on(drawerActions.CloseDrawerWithSnackBarMessage, (state, { payload }) => ({
    actionProgressState: false
  })),
  on(drawerActions.UpdateActionProgressState, (state, { payload }) => {
    state = { ...state, actionProgressState: false };
    return state;
  }),
);


export function DrawerReducer(state: DrawerState | undefined, action: Action) {
  return drawerReducer(state, action);
}
