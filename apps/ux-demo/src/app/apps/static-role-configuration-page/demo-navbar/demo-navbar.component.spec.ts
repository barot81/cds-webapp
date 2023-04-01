import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoNavbarComponent } from './demo-navbar.component';

describe('DemoNavbarComponent', () => {
  let component: DemoNavbarComponent;
  let fixture: ComponentFixture<DemoNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
