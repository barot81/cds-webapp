import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDataSourceComponent } from './zhealthcare-data-source.component';

describe('zhealthcareDataSourceComponent', () => {
  let component: zhealthcareDataSourceComponent;
  let fixture: ComponentFixture<zhealthcareDataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDataSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
