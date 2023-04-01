import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExxatTagExampleComponent } from './exxat-tag-example.component';

describe('ExxatTagExampleComponent', () => {
  let component: ExxatTagExampleComponent;
  let fixture: ComponentFixture<ExxatTagExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExxatTagExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExxatTagExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
