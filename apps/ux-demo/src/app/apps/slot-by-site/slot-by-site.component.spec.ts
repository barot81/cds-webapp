import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotBySiteComponent } from './slot-by-site.component';

describe('SlotBySiteComponent', () => {
  let component: SlotBySiteComponent;
  let fixture: ComponentFixture<SlotBySiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotBySiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotBySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
