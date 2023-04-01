import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTagExampleTwoComponent } from './zhealthcare-tag-example-two.component';

describe('zhealthcareTagExampleTwoComponent', () => {
  let component: zhealthcareTagExampleTwoComponent;
  let fixture: ComponentFixture<zhealthcareTagExampleTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTagExampleTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTagExampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
