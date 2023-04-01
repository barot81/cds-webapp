import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareSearchBarExampleComponent } from './zhealthcare-search-bar-example.component';

describe('zhealthcareSearchBarExampleComponent', () => {
  let component: zhealthcareSearchBarExampleComponent;
  let fixture: ComponentFixture<zhealthcareSearchBarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareSearchBarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareSearchBarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
