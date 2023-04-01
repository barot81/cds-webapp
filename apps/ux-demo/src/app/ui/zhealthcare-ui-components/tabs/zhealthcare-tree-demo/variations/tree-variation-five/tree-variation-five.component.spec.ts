import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeVariationFiveComponent } from './tree-variation-five.component';

describe('TreeVariationFiveComponent', () => {
  let component: TreeVariationFiveComponent;
  let fixture: ComponentFixture<TreeVariationFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeVariationFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeVariationFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
