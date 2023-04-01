import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarSeparateScrollComponent } from './left-sidebar-separate-scroll.component';

describe('LeftSidebarSeparateScrollComponent', () => {
  let component: LeftSidebarSeparateScrollComponent;
  let fixture: ComponentFixture<LeftSidebarSeparateScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSidebarSeparateScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarSeparateScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
