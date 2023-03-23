import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { zhealthcareAvatarListItemComponent } from './zhealthcare-avatar-list-item.component';

describe('zhealthcareAvatarListItemComponent', () => {
  let component: zhealthcareAvatarListItemComponent;
  let fixture: ComponentFixture<zhealthcareAvatarListItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [zhealthcareAvatarListItemComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareAvatarListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
