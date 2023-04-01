import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssChipsComponent } from './ess-chips.component';

describe('EssChipsComponent', () => {
  let component: EssChipsComponent;
  let fixture: ComponentFixture<EssChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
