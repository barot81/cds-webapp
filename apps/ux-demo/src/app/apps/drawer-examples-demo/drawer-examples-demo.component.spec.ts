import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerExamplesDemoComponent } from './drawer-examples-demo.component';

describe('DrawerExamplesDemoComponent', () => {
  let component: DrawerExamplesDemoComponent;
  let fixture: ComponentFixture<DrawerExamplesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawerExamplesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerExamplesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
