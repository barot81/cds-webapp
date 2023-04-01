import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareEditColumnsExampleComponent } from './zhealthcare-edit-columns-example.component';

describe('zhealthcareEditColumnsExampleComponent', () => {
  let component: zhealthcareEditColumnsExampleComponent;
  let fixture: ComponentFixture<zhealthcareEditColumnsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareEditColumnsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareEditColumnsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
