import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatSearchComponent } from './exxat-search.component';

describe('ExxatSearchComponent', () => {
  let component: ExxatSearchComponent;
  let fixture: ComponentFixture<ExxatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
