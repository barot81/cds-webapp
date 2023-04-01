import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingChecklistDrawerComponent } from './routing-checklist-drawer.component';

describe('RoutingChecklistDrawerComponent', () => {
  let component: RoutingChecklistDrawerComponent;
  let fixture: ComponentFixture<RoutingChecklistDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingChecklistDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingChecklistDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
