import { createSelector } from '@ngrx/store';
import { UIState } from '../reducers/uistate.reducers';
import { getUIState } from './uistate.selectors';
import { PageState } from '../reducers/page.reducers';

export const getPageState = createSelector(
  getUIState,
  (state: UIState) => state.page
);

export const getPageTitle = createSelector(
  getPageState,
  (state: PageState) => state.pageTitle
);


export const pageQuery = {
    getPageTitle
};
