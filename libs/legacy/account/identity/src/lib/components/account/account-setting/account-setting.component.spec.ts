import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingComponentDrawer } from './account-setting.component';

describe('AccountSettingComponentDrawer', () => {
  let component: AccountSettingComponentDrawer;
  let fixture: ComponentFixture<AccountSettingComponentDrawer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingComponentDrawer]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingComponentDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
