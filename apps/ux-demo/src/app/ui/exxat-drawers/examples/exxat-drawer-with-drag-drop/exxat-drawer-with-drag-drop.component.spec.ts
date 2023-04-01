import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDrawerWithDragDropComponent } from "./ExxatDrawerWithDragDropComponent";

describe('ExxatDrawerWithDragDropComponent', () => {
  let component: ExxatDrawerWithDragDropComponent;
  let fixture: ComponentFixture<ExxatDrawerWithDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDrawerWithDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDrawerWithDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
