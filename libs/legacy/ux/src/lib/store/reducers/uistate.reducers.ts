import { ActionReducerMap } from '@ngrx/store';
import { DrawerState, DrawerReducer } from './drawer.reducers';
import { ErrorState, ErrorReducer } from './errors.reducers';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router.reducers';
import { PageState, PageReducer } from './page.reducers';

export interface UIState {
  drawer: DrawerState;
  router: RouterReducerState<RouterStateUrl>;
  errors: ErrorState;
  page: PageState;
}

export const reducers: ActionReducerMap<UIState> = {
  drawer: DrawerReducer,
  router: routerReducer,
  errors: ErrorReducer,
  page: PageReducer
};
