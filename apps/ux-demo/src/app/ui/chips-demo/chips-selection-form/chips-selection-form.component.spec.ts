import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChipsSelectionFormComponent } from './chips-selection-form.component';


describe('ChipsSelectionFormComponent', () => {
  let component: ChipsSelectionFormComponent;
  let fixture: ComponentFixture<ChipsSelectionFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsSelectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
