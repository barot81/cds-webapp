import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOfAffiliationDemoComponent } from './map-of-affiliation-demo.component';

describe('MapOfAffiliationDemoComponent', () => {
  let component: MapOfAffiliationDemoComponent;
  let fixture: ComponentFixture<MapOfAffiliationDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOfAffiliationDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOfAffiliationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
