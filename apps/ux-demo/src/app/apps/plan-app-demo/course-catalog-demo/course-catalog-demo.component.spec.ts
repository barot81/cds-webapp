import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatalogDemoComponent } from './course-catalog-demo.component';

describe('CourseCatalogDemoComponent', () => {
  let component: CourseCatalogDemoComponent;
  let fixture: ComponentFixture<CourseCatalogDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCatalogDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCatalogDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
