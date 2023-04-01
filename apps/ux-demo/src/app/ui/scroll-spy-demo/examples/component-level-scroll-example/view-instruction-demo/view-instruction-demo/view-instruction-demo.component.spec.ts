import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstructionDemoComponent } from './view-instruction-demo.component';

describe('ViewInstructionDemoComponent', () => {
  let component: ViewInstructionDemoComponent;
  let fixture: ComponentFixture<ViewInstructionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInstructionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstructionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
