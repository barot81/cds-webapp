import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDemoComponent } from './slot-demo.component';

describe('SlotDemoComponent', () => {
  let component: SlotDemoComponent;
  let fixture: ComponentFixture<SlotDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
