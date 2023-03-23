import { Injectable } from '@angular/core';
import { Logger } from '../services/logger/logger.extension';
import { Observable, Subject, Subscription } from 'rxjs';
import { EventItem } from './event.model';

const ServiceName = 'Events Service';

@Injectable({ providedIn: 'root' })
export class EventsService implements IEventsService {
  private events = {};

  constructor() {}

  public subscribe(event: string): Observable<EventItem>;
  public subscribe(event: string, callback: (value: any) => void): Subscription;
  // tslint:disable-next-line:unified-signatures
  public subscribe(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void
  ): Subscription;
  // tslint:disable-next-line:unified-signatures
  public subscribe(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void,
    complete: () => void
  ): Subscription;
  public subscribe(
    event: string,
    callback?: (value: any) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    if (!event) {
      throw new Error(
        `[${ServiceName}] => Subscription method must get event name.`
      );
    }

    if (this.events[event] === undefined) {
      this.events[event] = new Subject<EventItem>();
    }

    if (typeof callback !== 'function') {
      return this.events[event].asObservable();
    } else {
      return this.events[event]
        .asObservable()
        .subscribe(callback, error, complete);
    }
  }

  public publish(event: string, eventObject?: EventItem): void {
    if (!event) {
      throw new Error(
        `[${ServiceName}] => Publish method must get event name.`
      );
    } else if (!this.events[event]) {
      return;
    }
    this.events[event].next(eventObject);
  }

  public delete(event: string): void {
    if (!event) {
      const error = new Error(
        `[${ServiceName}] => Delete method must get event name.`
      );
      Logger.error(error);
      throw error;
    }
    delete this.events[event];
  }
}

export interface IEventsService {
  publish(event: string, eventObject?: EventItem): void;
  subscribe(event: string): Observable<EventItem>;
  subscribe(event: string, callback: (value: any) => void): Subscription;
  // tslint:disable-next-line:unified-signatures
  subscribe(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void
  ): Subscription;
  // tslint:disable-next-line:unified-signatures
  subscribe(
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void,
    complete: () => void
  ): Subscription;
}

interface ISubscribe {
  (event: string): Observable<EventItem>;
  (event: string, callback: (value: any) => void): Subscription;
  // tslint:disable-next-line:unified-signatures
  (
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void
  ): Subscription;
  // tslint:disable-next-line:unified-signatures
  (
    event: string,
    callback: (value: any) => void,
    error: (error: any) => void,
    complete: () => void
  ): Subscription;
}
