import { EventItem } from '../event/event.model';
import { EventsService } from '../event/event.service';
import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoundationInjector } from './../injector/foundation-injector';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  baseData: any;
  subscriptions: Subscription[];
  private readonly eventService: EventsService;

  constructor() {
    this.eventService = FoundationInjector.get(EventsService);
    this.subscriptions = new Array<Subscription>();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.forEach((m) => m.unsubscribe());
  }

  protected publishEvent(eventName: string, data: EventItem) {
    this.eventService.publish(eventName, data);
  }

  protected subscribeEvent(
    eventName: string,
    callback: (value: any) => void,
    error: (error: any) => void = null,
    complete: () => void = null
  ) {
    if (typeof complete === 'function') {
      this.subscriptions.push(
        this.eventService.subscribe(eventName, callback, error, complete)
      );
    } else if (typeof error === 'function') {
      this.subscriptions.push(
        this.eventService.subscribe(eventName, callback, error)
      );
    } else if (typeof callback === 'function') {
      this.subscriptions.push(this.eventService.subscribe(eventName, callback));
    }
  }

  protected updateRefArea(data: EventItem) {
    this.eventService.publish('ui_update_event', data);
  }

  protected destroyRefArea() {
    this.eventService.publish('ui_destroy_event');
  }

  protected updateWorkArea(data: EventItem) {
    this.eventService.publish('ui_update_work_event', data);
  }

  protected workAreaUpdateHandler(callback: (value: any) => void) {
    this.subscriptions.push(
      this.eventService.subscribe('ui_update_work_event', callback)
    );
  }
}
