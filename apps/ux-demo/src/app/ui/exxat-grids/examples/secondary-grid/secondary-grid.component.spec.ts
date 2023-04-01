import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryGridComponent } from './secondary-grid.component';

describe('SecondaryGridComponent', () => {
  let component: SecondaryGridComponent;
  let fixture: ComponentFixture<SecondaryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
