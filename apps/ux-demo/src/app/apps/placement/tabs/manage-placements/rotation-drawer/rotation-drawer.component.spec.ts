import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationDrawerComponent } from './rotation-drawer.component';

describe('RotationDrawerComponent', () => {
  let component: RotationDrawerComponent;
  let fixture: ComponentFixture<RotationDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
