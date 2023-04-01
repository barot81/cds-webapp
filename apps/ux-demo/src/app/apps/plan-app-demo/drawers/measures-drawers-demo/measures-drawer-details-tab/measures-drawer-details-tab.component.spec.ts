import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresDrawerDetailsTabComponent } from './measures-drawer-details-tab.component';

describe('MeasuresDrawerDetailsTabComponent', () => {
  let component: MeasuresDrawerDetailsTabComponent;
  let fixture: ComponentFixture<MeasuresDrawerDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuresDrawerDetailsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuresDrawerDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
