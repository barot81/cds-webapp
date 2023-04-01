import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerWithTableComponent } from './drawer-with-table.component';

describe('DrawerWithTableComponent', () => {
  let component: DrawerWithTableComponent;
  let fixture: ComponentFixture<DrawerWithTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerWithTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerWithTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
