import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareDrawerWithDragDropComponent } from "./zhealthcareDrawerWithDragDropComponent";

describe('zhealthcareDrawerWithDragDropComponent', () => {
  let component: zhealthcareDrawerWithDragDropComponent;
  let fixture: ComponentFixture<zhealthcareDrawerWithDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareDrawerWithDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareDrawerWithDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
