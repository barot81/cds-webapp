import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTreeControlComponent } from './horizontal-tree-control.component';

describe('HorizontalTreeControlComponent', () => {
  let component: HorizontalTreeControlComponent;
  let fixture: ComponentFixture<HorizontalTreeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalTreeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalTreeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
