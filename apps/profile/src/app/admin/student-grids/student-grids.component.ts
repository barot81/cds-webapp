import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CohortFacade } from '@exxat/cohort/store';
import { FeatureMetadataService } from '@exxat/fusion/services';
import { FEATURECODE } from '@exxat/profile/models';
import { RouterStateFacade } from '@exxat/ux';
import { Subject } from 'rxjs';
export interface ButtonToggle {
  value: string;
  icon?: string;
  label: string;
}
@Component({
  selector: 'profile-admin-student-grids',
  templateUrl: './student-grids.component.html'
})
export class StudentGridsComponent implements OnInit {
  feature: FEATURECODE;
  AdvancedViewCode: any;
  selectedView ='grid-view';
  private readonly _unsubscribe: Subject<any>;


  constructor(private readonly router: Router,   
    private readonly featureService: FeatureMetadataService,
    private readonly _routerStateFacade: RouterStateFacade,
    public _cohortFacade: CohortFacade
    ) {
      this._cohortFacade.getCohort();
      this.feature = new FEATURECODE();
      this.AdvancedViewCode = this.feature.studentFeatureAdvancedView;
      
      if (this.router.url.includes('advanced-view'))
    {
      this.selectView('advanced-view');
    }
    else
    {
      this.selectView('grid-view');
    }
  
  }

  ngOnInit(): void {
    this.featureService.initialize('s100', 'student.profile');
  }

  selectView(view) {
    this.selectedView = view;
  }
}
