import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticRoleConfigurationDrawerDemoComponent } from './static-role-configuration-drawer-demo.component';

describe('StaticRoleConfigurationDrawerDemoComponent', () => {
  let component: StaticRoleConfigurationDrawerDemoComponent;
  let fixture: ComponentFixture<StaticRoleConfigurationDrawerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticRoleConfigurationDrawerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticRoleConfigurationDrawerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
