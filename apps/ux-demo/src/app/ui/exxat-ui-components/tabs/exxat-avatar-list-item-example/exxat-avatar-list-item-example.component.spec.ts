import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatAvatarListItemExampleComponent } from './exxat-avatar-list-item-example.component';

describe('ExxatAvatarListItemExampleComponent', () => {
  let component: ExxatAvatarListItemExampleComponent;
  let fixture: ComponentFixture<ExxatAvatarListItemExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatAvatarListItemExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatAvatarListItemExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
