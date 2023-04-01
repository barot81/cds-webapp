import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresDrawersDemoComponent } from './measures-drawers-demo.component';

describe('MeasuresDrawersDemoComponent', () => {
  let component: MeasuresDrawersDemoComponent;
  let fixture: ComponentFixture<MeasuresDrawersDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuresDrawersDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuresDrawersDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
