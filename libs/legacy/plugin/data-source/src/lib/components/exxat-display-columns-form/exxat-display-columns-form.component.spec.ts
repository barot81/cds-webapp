import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDisplayColumnsFormComponent } from './zhealthcare-display-columns-form.component';

describe('zhealthcareDisplayColumnsFormComponent', () => {
  let component: zhealthcareDisplayColumnsFormComponent;
  let fixture: ComponentFixture<zhealthcareDisplayColumnsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDisplayColumnsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDisplayColumnsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
