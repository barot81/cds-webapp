import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareToggleExampleComponent } from './zhealthcare-toggle-example.component';

describe('zhealthcareToggleExampleComponent', () => {
  let component: zhealthcareToggleExampleComponent;
  let fixture: ComponentFixture<zhealthcareToggleExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareToggleExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareToggleExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
