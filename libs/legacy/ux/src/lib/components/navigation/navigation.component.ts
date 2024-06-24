import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { OrgFacade } from '@zhealthcare/fusion/core';
import {
  FusionNavigationService,
  MsalAuthService,
} from '@zhealthcare/fusion/services';

@Component({
  selector: 'fusion-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FusionNavigationComponent implements OnChanges, OnInit, OnDestroy {
  @Input() navigation: any;
  @Input() aliasLabels: any;
  navAliasLoaded$ = new BehaviorSubject<boolean>(true);
  siteLabel = 'Sites';
  myRequestLabel = 'My Request';
  siteDescription = 'sites';

  // Private
  private _unsubscribeAll: Subject<boolean>;

  isOucodeSelected$: Observable<boolean>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _fusionNavigationService: FusionNavigationService,
    private _orgFacade: OrgFacade,
    private authService: MsalAuthService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.isOucodeSelected$ = this._orgFacade.selectedStatus$.pipe(
      takeUntil(this._unsubscribeAll),
      map((x) => (x === undefined || x === null ? false : true))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.aliasLabels?.currentValue !== changes?.aliasLabels?.previousValue
    ) {
      this.navAliasLoaded$.next(false);
      this._changeDetectorRef.detectChanges();
      this.navAliasLoaded$.next(true);
    }
  }

  async ngOnInit() {
    // Load the navigation either from the input or from the service
    this.navigation =
      this.navigation || this._fusionNavigationService.getCurrentNavigation();

    // const supportedGroups = await this.authService.getGroupsFromToken();
    // const navs = this.filterMenuItems(this.navigation, supportedGroups);
    // console.log(navs);
    // this.navigation = navs;

    this.sortNavigation();

    // Subscribe to the current navigation changes
    this._fusionNavigationService.onNavigationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Load the navigation
        this.authService
        .getGroupsFromToken()
        .then((supportedGroups) => {
            this.navigation = this._fusionNavigationService
                  .getCurrentNavigation()
                  .filter(x=> this.hasGroup(supportedGroups, x.groups, x));
            console.log(this.navigation);
            // const navs = this.filterMenuItems(
            //   this.navigation,
            //   supportedGroups
            // );
            // console.log(navs);
            // this.navigation = navs;
            // Mark for check
            this._changeDetectorRef.markForCheck();
          });
      });

    // Subscribe to navigation item
    merge(
      this._fusionNavigationService.onNavigationItemAdded,
      this._fusionNavigationService.onNavigationItemUpdated,
      this._fusionNavigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  hasGroup(supportedGroupIds, itemGroups, navItem) {
    console.log(navItem);
    if(!itemGroups || itemGroups.length === 0) return true;
    return supportedGroupIds.some((groupId) => itemGroups.includes(groupId));
  }


  // Apply the filter to each menu in the data arra

  // return {
  //   ...navigations,
  //   data: filteredData,
  // };

  sortNavigation() {
    if (
      this.navigation &&
      this.navigation != null &&
      this.navigation.length > 0
    ) {
      this.navigation = JSON.parse(
        JSON.stringify(
          this._fusionNavigationService.sortNavigation(this.navigation)
        )
      );
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
