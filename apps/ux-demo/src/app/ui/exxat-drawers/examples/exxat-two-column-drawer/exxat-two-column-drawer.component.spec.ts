import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTwoColumnDrawerComponent } from './exxat-two-column-drawer.component';

describe('ExxatTwoColumnDrawerComponent', () => {
  let component: ExxatTwoColumnDrawerComponent;
  let fixture: ComponentFixture<ExxatTwoColumnDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTwoColumnDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTwoColumnDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
