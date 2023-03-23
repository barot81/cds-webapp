import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectAllComponent } from './select-all.component';

describe('SelectAllComponent', () => {
  let component: SelectAllComponent;
  let fixture: ComponentFixture<SelectAllComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SelectAllComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
