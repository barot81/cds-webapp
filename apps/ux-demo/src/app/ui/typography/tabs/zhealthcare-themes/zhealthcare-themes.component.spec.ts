import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareThemesComponent } from './zhealthcare-themes.component';

describe('zhealthcareThemesComponent', () => {
  let component: zhealthcareThemesComponent;
  let fixture: ComponentFixture<zhealthcareThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
