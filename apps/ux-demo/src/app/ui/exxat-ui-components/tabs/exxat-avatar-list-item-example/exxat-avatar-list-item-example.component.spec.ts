import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareAvatarListItemExampleComponent } from './zhealthcare-avatar-list-item-example.component';

describe('zhealthcareAvatarListItemExampleComponent', () => {
  let component: zhealthcareAvatarListItemExampleComponent;
  let fixture: ComponentFixture<zhealthcareAvatarListItemExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareAvatarListItemExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareAvatarListItemExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
