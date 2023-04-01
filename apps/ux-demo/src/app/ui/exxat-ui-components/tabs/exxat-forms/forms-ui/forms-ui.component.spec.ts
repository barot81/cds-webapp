import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsUiComponent } from './forms-ui.component';

describe('FormsUiComponent', () => {
  let component: FormsUiComponent;
  let fixture: ComponentFixture<FormsUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
