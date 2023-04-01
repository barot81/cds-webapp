import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionListDemoComponent } from './institution-list-demo.component';

describe('InstitutionListDemoComponent', () => {
  let component: InstitutionListDemoComponent;
  let fixture: ComponentFixture<InstitutionListDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionListDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionListDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
