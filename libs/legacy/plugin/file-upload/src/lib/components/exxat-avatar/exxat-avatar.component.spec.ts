import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { zhealthcareAvatarComponent } from './zhealthcare-avatar.component';



describe('zhealthcareAvatarComponent', () => {
  let component: zhealthcareAvatarComponent;
  let fixture: ComponentFixture<zhealthcareAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
