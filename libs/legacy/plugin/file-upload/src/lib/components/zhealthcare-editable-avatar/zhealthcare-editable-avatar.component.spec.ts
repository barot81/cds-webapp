import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { zhealthcareEditableAvatarComponent } from './zhealthcare-editable-avatar.component';



describe('zhealthcareAvatarComponent', () => {
  let component: zhealthcareEditableAvatarComponent;
  let fixture: ComponentFixture<zhealthcareEditableAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareEditableAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareEditableAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
