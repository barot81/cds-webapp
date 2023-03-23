import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedChipsComponent } from './specialized-chips.component';

describe('SpecializedChipsComponent', () => {
  let component: SpecializedChipsComponent;
  let fixture: ComponentFixture<SpecializedChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializedChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializedChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
