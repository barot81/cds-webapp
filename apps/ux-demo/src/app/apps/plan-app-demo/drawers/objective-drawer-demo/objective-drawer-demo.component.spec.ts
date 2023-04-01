import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveDrawerDemoComponent } from './objective-drawer-demo.component';

describe('ObjectiveDrawerDemoComponent', () => {
  let component: ObjectiveDrawerDemoComponent;
  let fixture: ComponentFixture<ObjectiveDrawerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveDrawerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveDrawerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
