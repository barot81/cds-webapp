import { NgModule, ModuleWithProviders } from '@angular/core';
import { EventsService } from './event.service';

@NgModule({
  providers: [EventsService],
})
export class EventsModule {
  public static forRoot(): ModuleWithProviders<EventsModule> {
    return {
      ngModule: EventsModule,
      providers: [EventsService],
    };
  }
}
