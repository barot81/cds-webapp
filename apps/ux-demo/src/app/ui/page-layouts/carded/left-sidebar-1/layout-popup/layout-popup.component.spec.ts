import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPopComponent } from './layout-popup.component';

describe('LayoutPopComponent', () => {
  let component: LayoutPopComponent;
  let fixture: ComponentFixture<LayoutPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
