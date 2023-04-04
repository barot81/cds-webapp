import { Injectable } from '@angular/core';
import {  EventItem } from '@zhealthcare/fusion/core';
import { UIState } from '@zhealthcare/fusion/core';

@Injectable({providedIn: 'any'})
export class AccountNavigtaionService {

  public cachedComponent;

  getEventItemOfAccount():EventItem {
    const uiState = new UIState(this.cachedComponent, "");
    const eventItem: EventItem = { payload: uiState };
    return eventItem;
  }
}
