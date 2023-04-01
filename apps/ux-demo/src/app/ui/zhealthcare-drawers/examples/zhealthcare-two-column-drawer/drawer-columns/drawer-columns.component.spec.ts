import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerColumnsComponent } from './drawer-columns.component';

describe('DrawerColumnsComponent', () => {
  let component: DrawerColumnsComponent;
  let fixture: ComponentFixture<DrawerColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
