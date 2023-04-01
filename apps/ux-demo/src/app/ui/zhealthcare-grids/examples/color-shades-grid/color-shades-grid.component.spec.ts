import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorShadesGridComponent } from './color-shades-grid.component';

describe('ColorShadesGridComponent', () => {
  let component: ColorShadesGridComponent;
  let fixture: ComponentFixture<ColorShadesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorShadesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorShadesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
