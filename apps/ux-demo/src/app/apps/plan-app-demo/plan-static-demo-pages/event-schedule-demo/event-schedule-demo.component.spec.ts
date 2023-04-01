import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventScheduleDemoComponent } from './event-schedule-demo.component';

describe('EventScheduleDemoComponent', () => {
  let component: EventScheduleDemoComponent;
  let fixture: ComponentFixture<EventScheduleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventScheduleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventScheduleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
