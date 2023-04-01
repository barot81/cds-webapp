import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUsingTwoFuseSidebarsComponent } from './layout-using-two-fuse-sidebars.component';

describe('LayoutUsingTwoFuseSidebarsComponent', () => {
  let component: LayoutUsingTwoFuseSidebarsComponent;
  let fixture: ComponentFixture<LayoutUsingTwoFuseSidebarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutUsingTwoFuseSidebarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutUsingTwoFuseSidebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
