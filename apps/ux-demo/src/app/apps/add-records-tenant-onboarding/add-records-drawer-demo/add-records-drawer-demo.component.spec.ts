import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordsDrawerDemoComponent } from './add-records-drawer-demo.component';

describe('AddRecordsDrawerDemoComponent', () => {
  let component: AddRecordsDrawerDemoComponent;
  let fixture: ComponentFixture<AddRecordsDrawerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecordsDrawerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordsDrawerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
