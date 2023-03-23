import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { GlobalVariable, OrgFacade } from '@exxat/fusion/core';
import { FusionNavigationService } from '@exxat/fusion/services';

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
    private _orgFacade: OrgFacade
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.isOucodeSelected$ = this._orgFacade.selectedOucode$.pipe(
      takeUntil(this._unsubscribeAll),
      map((x) => (x === undefined || x === null ? false : true))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.aliasLabels?.currentValue !== changes?.aliasLabels?.previousValue
    ) {
      this.navigation?.forEach(parent => {
        if(parent.children?.find(child => child.id === 'admin.site') !== undefined) { 
          const sitelabel = GlobalVariable.settingDictionary.get('Sites')?.value ?? this.siteLabel;
          parent.children.find(child => child.id === 'admin.site').title = sitelabel;
          const desc = parent.children.find(child => child.id === 'admin.site').description.replace(/sites/gi, sitelabel);
          parent.children.find(child => child.id === 'admin.site').description = desc;
        }
        if(parent.children?.find(child => child.id === 'admin.placement-requests') !== undefined) {
          parent.children.find(child => child.id === 'admin.placement-requests').title = 'Process ' + GlobalVariable.settingDictionary.get('MyRequest')?.value + 's' ?? this.myRequestLabel;
        }
      });
      this.navAliasLoaded$.next(false);
      this._changeDetectorRef.detectChanges();
      this.navAliasLoaded$.next(true);
    }
  }

  ngOnInit(): void {
    // Load the navigation either from the input or from the service
    this.navigation =
      this.navigation || this._fusionNavigationService.getCurrentNavigation();

    this.sortNavigation();

    // Subscribe to the current navigation changes
    this._fusionNavigationService.onNavigationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Load the navigation
        this.navigation = this._fusionNavigationService.getCurrentNavigation();
        this.sortNavigation();
        this.navigation?.forEach(parent => {
          if(parent.children?.find(child => child.id === 'admin.site') !== undefined) {
            parent.children.find(child => child.id === 'admin.site').title = GlobalVariable.settingDictionary.get('Sites')?.value ?? this.siteLabel;
          }
          if(parent.children?.find(child => child.id === 'admin.placement-requests') !== undefined) {
            parent.children.find(child => child.id === 'admin.placement-requests').title = 'Process ' + GlobalVariable.settingDictionary.get('MyRequest')?.value + 's' ?? this.myRequestLabel;
          }
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
