import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedChipDemoComponent } from './specialized-chip-demo.component';

describe('SpecializedChipDemoComponent', () => {
  let component: SpecializedChipDemoComponent;
  let fixture: ComponentFixture<SpecializedChipDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecializedChipDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializedChipDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
