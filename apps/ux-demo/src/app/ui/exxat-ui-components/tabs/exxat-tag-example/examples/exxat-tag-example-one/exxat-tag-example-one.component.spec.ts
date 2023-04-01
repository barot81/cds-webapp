import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTagExampleOneComponent } from './exxat-tag-example-one.component';

describe('ExxatTagExampleOneComponent', () => {
  let component: ExxatTagExampleOneComponent;
  let fixture: ComponentFixture<ExxatTagExampleOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTagExampleOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTagExampleOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
