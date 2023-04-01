import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareSearchBarComponent } from './zhealthcare-search-bar.component';

describe('zhealthcareSearchBarComponent', () => {
  let component: zhealthcareSearchBarComponent;
  let fixture: ComponentFixture<zhealthcareSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
