import { ActionReducer } from '@ngrx/store';
import { EventsService, EventItem } from '../../event';
import { FoundationInjector } from '../../injector/foundation-injector';
import { UserActionTypes } from '../actions/user.actions';

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    if (action.type === (UserActionTypes.Logout || UserActionTypes.AzureLogout)) {
       const eventService: EventsService = FoundationInjector.get(EventsService);
       const eventItem: EventItem = { payload: true };
       eventService.publish('LOGOUT',eventItem);
          state = undefined;
    }

    return reducer(state, action);
  }
}
