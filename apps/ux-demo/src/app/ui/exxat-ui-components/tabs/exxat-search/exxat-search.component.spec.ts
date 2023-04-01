import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareSearchComponent } from './zhealthcare-search.component';

describe('zhealthcareSearchComponent', () => {
  let component: zhealthcareSearchComponent;
  let fixture: ComponentFixture<zhealthcareSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
