import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { zhealthcareSkeletonExampleComponent } from './zhealthcare-skeleton-example.component';

describe('zhealthcareSkeletonExampleComponent', () => {
  let component: zhealthcareSkeletonExampleComponent;
  let fixture: ComponentFixture<zhealthcareSkeletonExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ zhealthcareSkeletonExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(zhealthcareSkeletonExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
