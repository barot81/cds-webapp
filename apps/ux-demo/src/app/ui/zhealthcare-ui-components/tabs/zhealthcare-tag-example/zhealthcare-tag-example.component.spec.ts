import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareTagExampleComponent } from './zhealthcare-tag-example.component';

describe('zhealthcareTagExampleComponent', () => {
  let component: zhealthcareTagExampleComponent;
  let fixture: ComponentFixture<zhealthcareTagExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareTagExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareTagExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
