import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWishlistDemoComponent } from './student-wishlist-demo.component';

describe('StudentWishlistDemoComponent', () => {
  let component: StudentWishlistDemoComponent;
  let fixture: ComponentFixture<StudentWishlistDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWishlistDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWishlistDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
