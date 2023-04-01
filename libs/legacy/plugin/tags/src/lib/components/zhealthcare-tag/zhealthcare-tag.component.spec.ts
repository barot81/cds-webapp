import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTagComponent } from './zhealthcare-tag.component';

describe('zhealthcareTagComponent', () => {
  let component: zhealthcareTagComponent;
  let fixture: ComponentFixture<zhealthcareTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
