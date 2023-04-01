import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareUiComponentsComponent } from './zhealthcare-ui-components.component';

describe('zhealthcareUiComponentsComponent', () => {
  let component: zhealthcareUiComponentsComponent;
  let fixture: ComponentFixture<zhealthcareUiComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareUiComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareUiComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
