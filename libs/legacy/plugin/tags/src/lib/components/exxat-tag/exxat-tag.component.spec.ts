import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTagComponent } from './exxat-tag.component';

describe('ExxatTagComponent', () => {
  let component: ExxatTagComponent;
  let fixture: ComponentFixture<ExxatTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
