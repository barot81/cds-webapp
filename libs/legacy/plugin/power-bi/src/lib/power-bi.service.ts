import { Injectable } from '@angular/core';
import { OrgFacade } from '@exxat/fusion/core';

@Injectable()
export class PowerBIService {
  tenantId: string;
  selectedOucode: string;

  constructor(private readonly orgFacade: OrgFacade) {}

  init() {
    this.tenantId = localStorage.getItem('TenantId');
    this.orgFacade.selectedOucode$.subscribe((x) => {
      this.selectedOucode = x.Oucode;
    });
  }
}
