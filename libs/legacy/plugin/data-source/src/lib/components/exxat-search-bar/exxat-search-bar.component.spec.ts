import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatSearchBarComponent } from './exxat-search-bar.component';

describe('ExxatSearchBarComponent', () => {
  let component: ExxatSearchBarComponent;
  let fixture: ComponentFixture<ExxatSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
