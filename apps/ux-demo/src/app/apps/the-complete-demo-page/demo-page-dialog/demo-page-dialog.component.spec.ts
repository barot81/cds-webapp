import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPageDialogComponent } from './demo-page-dialog.component';

describe('DemoPageDialogComponent', () => {
  let component: DemoPageDialogComponent;
  let fixture: ComponentFixture<DemoPageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
