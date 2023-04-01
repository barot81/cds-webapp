import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatMediaQueryComponent } from './exxat-media-query.component';

describe('ExxatMediaQueryComponent', () => {
  let component: ExxatMediaQueryComponent;
  let fixture: ComponentFixture<ExxatMediaQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatMediaQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatMediaQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
