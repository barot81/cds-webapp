import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { zhealthcareDrawerReactiveFormComponent } from './zhealthcare-drawer-reactive-form.component';

describe('zhealthcareDrawerFormExampleComponent', () => {
  let component: zhealthcareDrawerReactiveFormComponent;
  let fixture: ComponentFixture<zhealthcareDrawerReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDrawerReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDrawerReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
