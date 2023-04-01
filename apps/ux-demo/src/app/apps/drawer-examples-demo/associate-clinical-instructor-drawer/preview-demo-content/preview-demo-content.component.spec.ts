import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDemoContentComponent } from './preview-demo-content.component';

describe('PreviewDemoContentComponent', () => {
  let component: PreviewDemoContentComponent;
  let fixture: ComponentFixture<PreviewDemoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDemoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDemoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
