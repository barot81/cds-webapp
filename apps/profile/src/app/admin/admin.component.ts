import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FeatureMetadataService } from '@exxat/fusion/services';
import { DataSourceFacade } from '@exxat/plugin/data-source';
import { LookupSandbox } from '@exxat/profile/services';
import { TagMasterFacade } from '@exxat/profile/store';
import { FullScreenService, PageFacade, RouterStateFacade, ScrollService } from '@exxat/ux';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'profile-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('adminProfileHeader') adminProfileHeader: ElementRef;
  private readonly visible = new BehaviorSubject<boolean>(false);
  public visible$ = this.visible.asObservable();
  private readonly _unsubscribe: Subject<any>;

  constructor(
    public scrollService: ScrollService,
    private readonly _tagMasterFacade: TagMasterFacade,
    private readonly datasourceFacade: DataSourceFacade,
    private readonly _routerStateFacade: RouterStateFacade,
    private readonly featureService: FeatureMetadataService,
    public readonly _fullScreenService: FullScreenService,
    private readonly _lookupSandbox: LookupSandbox,
    private readonly pageFacade: PageFacade) {
    this._unsubscribe = new Subject();
    this._lookupSandbox.loadSetupLookups();
  }


  ngOnInit() {
    this.setHeaderHeight();
    this.pageFacade.setPageTitleByNavigationId("admin.profile");
    this._tagMasterFacade.getTagMaster();
    this.featureService.initialize('s100', 'student.profile');
    this.featureService.getLookupByName('gender').subscribe();
    this.featureService.getLookupByName('ethnicity').subscribe();
    this.featureService.getLookupByName('areasofinterest').subscribe();
    this.featureService.getLookupByName('race').subscribe();
    this.featureService.getLookupByName('state').subscribe();
    this.featureService.getLookupByName('countryType').subscribe();
    this.featureService.getLookupByName('proficiency').subscribe();
    this.featureService.getFormValidatorJson('Student.Profile').subscribe();
    this.featureService.getLookupByName('profilestatus').subscribe();
    this.featureService.getLookupByName('statusActive').subscribe();
    this.featureService.getLookupByName('statusinactive').subscribe();
    this.featureService.getLookupByName('statusGraduate').subscribe();
    this.featureService.getLookupByName('facultyrole').subscribe();
    this.featureService.getLookupByName('communicationmode').subscribe();
    this.featureService.getLookupByName('followupoption').subscribe();

    this._routerStateFacade.routeURL$.pipe(takeUntil(this._unsubscribe)).subscribe(response => {
      if (response !== null && response !== undefined) {
        if ((response.includes('search') || response.includes('report') || response.includes('configuration')
          || response.includes('dashboard')) && !response.includes('reportdetails')) {
          this.visible.next(true);
        }
        else
          this.visible.next(false);
      }
    })


  }

  setHeaderHeight() {
    setTimeout(() => {
      if (this.adminProfileHeader && this.adminProfileHeader != null) {
        this.scrollService.setMainHeaderHeight(this.scrollService.getMainHeaderHeight() + this.adminProfileHeader.nativeElement?.offsetHeight)
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
    this.datasourceFacade.DataSourceDestroy();
  }
}
