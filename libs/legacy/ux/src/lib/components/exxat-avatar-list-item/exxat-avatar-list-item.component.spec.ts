import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExxatAvatarListItemComponent } from './exxat-avatar-list-item.component';

describe('ExxatAvatarListItemComponent', () => {
  let component: ExxatAvatarListItemComponent;
  let fixture: ComponentFixture<ExxatAvatarListItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExxatAvatarListItemComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatAvatarListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
