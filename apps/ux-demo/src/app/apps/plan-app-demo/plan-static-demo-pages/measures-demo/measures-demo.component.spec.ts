import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresDemoComponent } from './measures-demo.component';

describe('MeasuresDemoComponent', () => {
  let component: MeasuresDemoComponent;
  let fixture: ComponentFixture<MeasuresDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasuresDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuresDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
