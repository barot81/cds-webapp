import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageDemoComponent } from './inner-page-demo.component';

describe('InnerPageDemoComponent', () => {
  let component: InnerPageDemoComponent;
  let fixture: ComponentFixture<InnerPageDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPageDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
