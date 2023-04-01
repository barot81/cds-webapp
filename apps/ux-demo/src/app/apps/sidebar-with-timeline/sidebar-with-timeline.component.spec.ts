import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWithTimelineComponent } from './sidebar-with-timeline.component';

describe('SidebarWithTimelineComponent', () => {
  let component: SidebarWithTimelineComponent;
  let fixture: ComponentFixture<SidebarWithTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarWithTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarWithTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
