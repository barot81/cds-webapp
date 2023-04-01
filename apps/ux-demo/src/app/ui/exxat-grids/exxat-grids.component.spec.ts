import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareGridsComponent } from './zhealthcare-grids.component';

describe('zhealthcareGridsComponent', () => {
  let component: zhealthcareGridsComponent;
  let fixture: ComponentFixture<zhealthcareGridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareGridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
