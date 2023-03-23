import { Action, createReducer, on, State } from '@ngrx/store';
import * as fromPageActions from '../actions/page.actions';


export interface PageState {
    pageTitle: string,
    navigationId: string
}

const initialPageState: PageState = {
    pageTitle: "zhealthcare",
    navigationId : "default"
}


const pageReducer = createReducer(
  initialPageState,
  on(fromPageActions.setPageTitle, (state: PageState, { pageTitle }) => {
    return { ...state, pageTitle: pageTitle };
  }),
  on(fromPageActions.setPageTitleWithNavigationId, (state: PageState, { pageTitle, navigationId }) => {
    return { ...state, pageTitle: pageTitle, navigationId: navigationId };
  }),

  on(fromPageActions.ClearPageState, state => state = initialPageState)
);


export function PageReducer(state: PageState | undefined, action: Action) {
  return pageReducer(state, action);
}
