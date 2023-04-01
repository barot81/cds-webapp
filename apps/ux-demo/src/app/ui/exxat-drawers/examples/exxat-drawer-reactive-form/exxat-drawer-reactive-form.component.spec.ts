import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExxatDrawerReactiveFormComponent } from './exxat-drawer-reactive-form.component';

describe('ExxatDrawerFormExampleComponent', () => {
  let component: ExxatDrawerReactiveFormComponent;
  let fixture: ComponentFixture<ExxatDrawerReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDrawerReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDrawerReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
