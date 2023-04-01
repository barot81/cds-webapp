import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPagePrimaryNavbarComponent } from './inner-page-primary-navbar.component';

describe('InnerPagePrimaryNavbarComponent', () => {
  let component: InnerPagePrimaryNavbarComponent;
  let fixture: ComponentFixture<InnerPagePrimaryNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPagePrimaryNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPagePrimaryNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
