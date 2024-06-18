import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrgFacade } from '@zhealthcare/fusion/core';
import { ManageUserService } from '@zhealthcare/fusion/services';
import { HeaderService, PageFacade } from '@zhealthcare/ux';
import { AuditorPatientService } from '../../services/auditor-patient.service';

@Component({
  selector: 'pd-patient-dashboard',
  templateUrl: 'pd-patient-dashboard.component.html',
  styleUrls :['./pd-patient-dashboard.component.scss']
})

export class PdPatientDashboardComponent implements OnInit {

  constructor(private pageFacade: PageFacade, private router: Router,
    protected manageuser: ManageUserService,
    private _headerService: HeaderService,
    private orgFacade: OrgFacade,
    private _auditorPatientService :AuditorPatientService) {
    this.pageFacade.setPageTitle('360\xB0 claim optimization');
  }

  facilityWisePendingAuditor = [];
  ngOnInit() {
    this._auditorPatientService.getAuditorDashboard().subscribe((result: any)=>
      {
        result.forEach(x => {
          this.facilityWisePendingAuditor.push({
            name: x.facilityId,
            description: `Pending Auditor reviews 360\xB0 CLAIM OPTIMIZATION for ${x.facilityId} Hospital`,
            count : x.pendingReviewCount
          });
        });
      });
  }

  launch(item) {
    this.manageuser.setTenantId(item.name);
    this._headerService.setCurrentFacilityName(item.name);
    this.orgFacade.SetFacilityWiseStatuses({FacilityId: item.name, StatusCount: item.count});
    this.router.navigateByUrl('/admin/pd-patients/details');
  }
}
