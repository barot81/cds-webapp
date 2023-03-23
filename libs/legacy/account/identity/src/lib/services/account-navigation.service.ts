import { Injectable } from '@angular/core';
import {  EventItem } from '@exxat/fusion/core';
import { UIState } from '@exxat/fusion/core';

@Injectable({providedIn: 'any'})
export class AccountNavigtaionService {

  public cachedComponent: any;
  constructor() {

  }

  getEventItemOfAccount():EventItem {
    const uiState = new UIState(this.cachedComponent, "");
    const eventItem: EventItem = { payload: uiState };
    return eventItem;
  }
}
