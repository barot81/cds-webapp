import { TestBed } from '@angular/core/testing';

import { HelpCenterDrawerService } from './help-center-drawer.service';

describe('HelpCenterDrawerService', () => {
  let service: HelpCenterDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpCenterDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
