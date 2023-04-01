import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTagExampleTwoComponent } from './exxat-tag-example-two.component';

describe('ExxatTagExampleTwoComponent', () => {
  let component: ExxatTagExampleTwoComponent;
  let fixture: ComponentFixture<ExxatTagExampleTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTagExampleTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTagExampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
