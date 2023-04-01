import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStaticDemoPagesComponent } from './plan-static-demo-pages.component';

describe('PlanStaticDemoPagesComponent', () => {
  let component: PlanStaticDemoPagesComponent;
  let fixture: ComponentFixture<PlanStaticDemoPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanStaticDemoPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStaticDemoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
