import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidebarSingleScrollComponent } from './left-sidebar-single-scroll.component';

describe('LeftSidebarSingleScrollComponent', () => {
  let component: LeftSidebarSingleScrollComponent;
  let fixture: ComponentFixture<LeftSidebarSingleScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSidebarSingleScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarSingleScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
