import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExxatEditableAvatarComponent } from './exxat-editable-avatar.component';



describe('ExxatAvatarComponent', () => {
  let component: ExxatEditableAvatarComponent;
  let fixture: ComponentFixture<ExxatEditableAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatEditableAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatEditableAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
