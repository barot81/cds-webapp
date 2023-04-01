import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatSkeletonExampleComponent } from './exxat-skeleton-example.component';

describe('ExxatSkeletonExampleComponent', () => {
  let component: ExxatSkeletonExampleComponent;
  let fixture: ComponentFixture<ExxatSkeletonExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatSkeletonExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatSkeletonExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
