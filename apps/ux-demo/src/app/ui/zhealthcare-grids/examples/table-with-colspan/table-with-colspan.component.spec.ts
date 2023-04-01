import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithColspanComponent } from './table-with-colspan.component';

describe('TableWithColspanComponent', () => {
  let component: TableWithColspanComponent;
  let fixture: ComponentFixture<TableWithColspanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWithColspanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithColspanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
