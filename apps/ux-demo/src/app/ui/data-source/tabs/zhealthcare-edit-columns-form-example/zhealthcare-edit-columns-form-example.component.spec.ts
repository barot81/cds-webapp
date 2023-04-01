import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareEditColumnsFormExampleComponent } from './zhealthcare-edit-columns-form-example.component';

describe('zhealthcareEditColumnsFormExampleComponent', () => {
  let component: zhealthcareEditColumnsFormExampleComponent;
  let fixture: ComponentFixture<zhealthcareEditColumnsFormExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareEditColumnsFormExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareEditColumnsFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
