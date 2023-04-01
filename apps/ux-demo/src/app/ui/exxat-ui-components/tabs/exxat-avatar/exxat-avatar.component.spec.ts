import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatAvatarComponent } from './exxat-avatar.component';

describe('ExxatAvatarComponent', () => {
  let component: ExxatAvatarComponent;
  let fixture: ComponentFixture<ExxatAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
