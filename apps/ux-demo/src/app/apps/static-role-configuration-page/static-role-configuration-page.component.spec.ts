import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticRoleConfigurationPageComponent } from './static-role-configuration-page.component';

describe('StaticRoleConfigurationPageComponent', () => {
  let component: StaticRoleConfigurationPageComponent;
  let fixture: ComponentFixture<StaticRoleConfigurationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticRoleConfigurationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticRoleConfigurationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
