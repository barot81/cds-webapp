import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTagExampleOneComponent } from './zhealthcare-tag-example-one.component';

describe('zhealthcareTagExampleOneComponent', () => {
  let component: zhealthcareTagExampleOneComponent;
  let fixture: ComponentFixture<zhealthcareTagExampleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTagExampleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTagExampleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
