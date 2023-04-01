import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridWithTwoHeaderRowsComponent } from './grid-with-two-header-rows.component';

describe('GridWithTwoHeaderRowsComponent', () => {
  let component: GridWithTwoHeaderRowsComponent;
  let fixture: ComponentFixture<GridWithTwoHeaderRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridWithTwoHeaderRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWithTwoHeaderRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
