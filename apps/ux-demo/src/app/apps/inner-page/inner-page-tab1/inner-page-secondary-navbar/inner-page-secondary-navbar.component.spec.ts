import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageSecondaryNavbarComponent } from './inner-page-secondary-navbar.component';

describe('InnerPageSecondaryNavbarComponent', () => {
  let component: InnerPageSecondaryNavbarComponent;
  let fixture: ComponentFixture<InnerPageSecondaryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPageSecondaryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPageSecondaryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
