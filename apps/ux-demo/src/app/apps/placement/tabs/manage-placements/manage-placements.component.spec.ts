import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlacementsComponent } from './manage-placements.component';

describe('ManagePlacementsComponent', () => {
  let component: ManagePlacementsComponent;
  let fixture: ComponentFixture<ManagePlacementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePlacementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
