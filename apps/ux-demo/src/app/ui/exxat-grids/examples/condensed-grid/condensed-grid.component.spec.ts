import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensedGridComponent } from './condensed-grid.component';

describe('CondensedGridComponent', () => {
  let component: CondensedGridComponent;
  let fixture: ComponentFixture<CondensedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondensedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
