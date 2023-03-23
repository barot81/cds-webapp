import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareEditColumnsComponent } from './zhealthcare-edit-columns.component';

describe('zhealthcareEditColumnsComponent', () => {
  let component: zhealthcareEditColumnsComponent;
  let fixture: ComponentFixture<zhealthcareEditColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareEditColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareEditColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
