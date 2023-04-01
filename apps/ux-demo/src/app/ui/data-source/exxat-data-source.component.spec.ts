import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatDataSourceComponent } from './exxat-data-source.component';

describe('ExxatDataSourceComponent', () => {
  let component: ExxatDataSourceComponent;
  let fixture: ComponentFixture<ExxatDataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatDataSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
