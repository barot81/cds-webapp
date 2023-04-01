import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryGridDemoComponent } from './secondary-grid-demo.component';

describe('SecondaryGridDemoComponent', () => {
  let component: SecondaryGridDemoComponent;
  let fixture: ComponentFixture<SecondaryGridDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryGridDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
