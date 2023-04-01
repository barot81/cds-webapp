import { async, TestBed } from '@angular/core/testing';
import { UxDemoModule } from './ux-demo.module';

describe('UxDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UxDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UxDemoModule).toBeDefined();
  });
});
