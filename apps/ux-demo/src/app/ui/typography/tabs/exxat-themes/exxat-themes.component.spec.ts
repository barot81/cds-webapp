import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatThemesComponent } from './exxat-themes.component';

describe('ExxatThemesComponent', () => {
  let component: ExxatThemesComponent;
  let fixture: ComponentFixture<ExxatThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
