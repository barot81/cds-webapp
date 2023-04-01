import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeVariationSevenComponent } from './tree-variation-seven.component';

describe('TreeVariationSevenComponent', () => {
  let component: TreeVariationSevenComponent;
  let fixture: ComponentFixture<TreeVariationSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeVariationSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeVariationSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
