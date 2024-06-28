import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { OAuthService } from 'angular-oauth2-oidc';
import {
  AuthSandbox,
  FusionConfigService,
  GlobalVariable,
  UserFacade,
  UserTypeService,
} from '@zhealthcare/fusion/core';
import { NavigationChangeDetector, NavigationItem } from '@zhealthcare/fusion/models';
import { takeUntil } from 'rxjs/operators';
import { NavigationConstants } from './navigation.constants';
import { NavigationHelper } from './navigationHelper';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FusionNavigationService implements OnDestroy {
  onItemCollapsed: Subject<any>;
  onItemCollapseToggled: Subject<any>;

  aliasLabels = new BehaviorSubject(null);

  private _orgLogoPath = new BehaviorSubject<string>('');
  public _orgLogoPath$ = this._orgLogoPath.asObservable();

  // Private
  private _defendAgainstBrowserBackButton = false;
  private readonly _onNavigationChanged: BehaviorSubject<any>;
  private readonly _onNavigationRegistered: BehaviorSubject<any>;
  private readonly _onNavigationUnregistered: BehaviorSubject<any>;
  private readonly _onNavigationItemAdded: BehaviorSubject<any>;
  private readonly _onNavigationItemUpdated: BehaviorSubject<any>;
  private readonly _onNavigationItemRemoved: BehaviorSubject<any>;
  private isLoading: boolean;
  private _currentNavigationKey: string;
  private _registry: { [key: string]: NavigationItem[] } = {};
  public navigationMeta;
  private readonly _unsubscribe: Subject<any>;

  constructor(
    private readonly _configService: FusionConfigService,
    private readonly authSandbox: AuthSandbox,
    private readonly _userFacade: UserFacade,
    private readonly userTypeService: UserTypeService,
    public router: Router,
    private oauthService: OAuthService
  ) {
    // Set the defaults
    this.onItemCollapsed = new Subject();
    this.onItemCollapseToggled = new Subject();

    // Set the private defaults

    this._currentNavigationKey = null;
    this._onNavigationChanged = new BehaviorSubject(null);
    this._onNavigationRegistered = new BehaviorSubject(null);
    this._onNavigationUnregistered = new BehaviorSubject(null);
    this._onNavigationItemAdded = new BehaviorSubject(null);
    this._onNavigationItemUpdated = new BehaviorSubject(null);
    this._onNavigationItemRemoved = new BehaviorSubject(null);

    this._unsubscribe = new Subject();

    //Exporting ReferenceKey
    this._userFacade.UserState$.pipe(takeUntil(this._unsubscribe)).subscribe(
      (state: any) => {
        if (!!state && !!state.user) {
          GlobalVariable.referenceKey = state.user.ReferenceKey;
          GlobalVariable.userId = state.user.Id;
        }
      }
    );
  }

  public setOrgLogoPath(path: string): void {
    this._orgLogoPath.next(path);
  }

  get onNavigationChanged(): Observable<any> {
    return this._onNavigationChanged.asObservable();
  }

  get onNavigationRegistered(): Observable<any> {
    return this._onNavigationRegistered.asObservable();
  }

  get onNavigationUnregistered(): Observable<any> {
    return this._onNavigationUnregistered.asObservable();
  }

  get onNavigationItemAdded(): Observable<any> {
    return this._onNavigationItemAdded.asObservable();
  }

  get onNavigationItemUpdated(): Observable<any> {
    return this._onNavigationItemUpdated.asObservable();
  }

  get onNavigationItemRemoved(): Observable<any> {
    return this._onNavigationItemRemoved.asObservable();
  }

  register(key: string, navigations: NavigationItem[]): void {
    // Check if the key already being used
    if (this._registry[key]) {
      console.error(
        `The navigation with the key '${key}' already exists. Either unregister it first or use a unique key.`
      );

      return;
    }

    // Add to the registry
    this._registry[key] = navigations;

    // Notify the subject
    this._onNavigationRegistered.next([key, navigations]);
  }

  unregister(key): void {
    // Check if the navigation exists
    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );
    }

    // Unregister the sidebar
    delete this._registry[key];

    // Notify the subject
    this._onNavigationUnregistered.next(key);
  }

  getNavigation(key): NavigationItem[] {
    // Check if the navigation exists

    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );

      return null;
    }

    // Return the sidebar
    return this._registry[key];
  }

  getFlatNavigation(navigation, flatNavigation: NavigationItem[] = []): any {
    for (const item of navigation) {
      if (item.type === 'item') {
        flatNavigation.push(item);

        continue;
      }

      if (item.type === 'collapsable' || item.type === 'group') {
        if (item.children) {
          this.getFlatNavigation(item.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  getCurrentNavigation(): NavigationItem[] {
    if (localStorage.getItem('isAuthenticated')) {
      if (!this._currentNavigationKey) {
        if (
          localStorage.getItem(NavigationConstants.MetaNavigation) ||
          (sessionStorage.getItem(NavigationConstants.MetaNavigation) &&
            !this.isLoading)
        ) {
          this.registration();
        } else if (
          !sessionStorage.getItem(NavigationConstants.MetaNavigation)
        ) {
          this.registration();
          console.warn(`The current navigation is not set.`);
        } else {
          console.warn(`The current navigation is not set.`);
        }
        return [];
      }

      return this.getNavigation(this._currentNavigationKey);
    } else {
      if (window.location.pathname == '/sso/response')
        return this.getNavigation(this._currentNavigationKey);
      else if (window.location.pathname == '/account/login') {
        // Don't redirect to login page without query parameters
      } else if (!!this._configService.appSettings?.authGuardSettings?.loginUrl)
        this.router.navigateByUrl('account/login');
      else return this.getNavigation(this._currentNavigationKey);
    }
  }

  setCurrentNavigation(key): void {
    // Check if the sidebar exists
    if (!this._registry[key]) {
      console.warn(
        `The navigation with the key '${key}' doesn't exist in the registry.`
      );

      return;
    }

    // Set the current navigation key
    this._currentNavigationKey = key;

    // Notify the subject
    this._onNavigationChanged.next(key);
  }

  getNavigationItem(id, navigation = null): NavigationItem | boolean {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
    }

    for (const item of navigation) {
      if (item.id === id) {
        return item;
      }

      if (item.children) {
        const childItem = this.getNavigationItem(id, item.children);

        if (childItem) {
          return childItem;
        }
      }
    }
    return false;
  }

  getNavigationItemParent(id, navigation = null, parent = null): any {
    if (!navigation) {
      navigation = this.getCurrentNavigation();
      parent = navigation;
    }

    for (const item of navigation) {
      if (item.id === id) {
        return parent;
      }

      if (item.children) {
        const childItem = this.getNavigationItemParent(id, item.children, item);

        if (childItem) {
          return childItem;
        }
      }
    }

    return false;
  }

  addNavigationItem(item, id): void {
    // Get the current navigation
    let navigation: any[] = this.getCurrentNavigation();
    if (navigation === undefined || navigation === null) navigation = [];
    // Add to the end of the navigation
    if (id === 'end') {
      navigation.push(item);

      // Trigger the observable
      this._onNavigationItemAdded.next(true);

      return;
    }

    // Add to the start of the navigation
    if (id === 'start') {
      navigation.unshift(item);

      // // Trigger the observable
    }

    // Add it to a specific location
    const parent: any = this.getNavigationItem(id);

    if (parent) {
      // Check if parent has a children entry,
      // and add it if it doesn't
      if (!parent.children) {
        parent.children = [];
      }

      // Add the item
      parent.children.push(item);
    }

    // Trigger the observable
    this._onNavigationItemAdded.next(true);
  }

  updateNavigationItem(id, properties): void {
    // Get the navigation item
    const navigationItem = this.getNavigationItem(id);

    // If there is no navigation with the give id, return
    if (!navigationItem) {
      return;
    }

    // Merge the navigation properties
    _.merge(navigationItem, properties);

    // Trigger the observable
    this._onNavigationItemUpdated.next(true);
  }

  removeNavigationItem(id): void {
    const item = this.getNavigationItem(id);

    // Return, if there is not such an item
    if (!item) {
      return;
    }

    // Get the parent of the item
    let parent = this.getNavigationItemParent(id);

    // This check is required because of the first level
    // of the navigation, since the first level is not
    // inside the 'children' array
    parent = parent.children || parent;

    // Remove the item
    parent.splice(parent.indexOf(item), 1);

    // Trigger the observable
    this._onNavigationItemRemoved.next(true);
  }

  getCurrentNavigationChilds(url: string): NavigationItem[] {
    const currentNaviggationItems = this.getCurrentNavigation();

    if (
      currentNaviggationItems &&
      currentNaviggationItems != null &&
      currentNaviggationItems.length > 0
    ) {
      let menuItemList = new Array<NavigationItem>();

      // Check For menu-group // menu-item;

      currentNaviggationItems.forEach((item) => {
        if (item && item != null && item.type && item.type != null) {
          if (
            item.type.toString().trim().toLowerCase() ===
            'menu-group'.toString().trim().toLowerCase()
          ) {
            const menuItems = this.getMenuItemList(item);
            if (menuItems && menuItems != null) {
              menuItemList = menuItemList.concat(menuItems);
            }
          } else {
            menuItemList.push(item);
          }
        }
      });

      let currentNavigationChilds = [];

      const navs = menuItemList.filter((x) => x.url === url);

      if (navs.length > 0) {
        navs.forEach((element) => {
          currentNavigationChilds = currentNavigationChilds.concat(
            this.UrlMatcher(element, url)
          );
        });
      } else {
        currentNaviggationItems.forEach((element) => {
          if (
            currentNavigationChilds === null ||
            currentNavigationChilds === undefined
          )
            currentNavigationChilds = this.UrlMatcher(element, url);
        });
      }

      return currentNavigationChilds;
    }
    return null;
  }

  getMenuItemList(menuGroup: NavigationItem): Array<NavigationItem> {
    if (
      menuGroup &&
      menuGroup != null &&
      menuGroup.children &&
      menuGroup.children != null
    ) {
      return menuGroup.children;
    }
  }

  UrlMatcher(element, url): NavigationItem[] {
    if (
      element.url != null &&
      (url.includes(element.url) ||
        (element.children.length > 0 && url.includes(element.url)))
    ) {
      return this.getMatchedNavigationItems(url, element);
    }
    return [];
  }

  getMatchedNavigationItems(url, element): NavigationItem[] {
    return url === element.url ||
      element.children.map(({ urls }) => url).some((res) => url.includes(res))
      ? element.children
      : new Array<NavigationItem>();
  }

  registration() {
    let metaNavigation = sessionStorage.getItem(
      NavigationConstants.MetaNavigation
    )
      ? JSON.parse(sessionStorage.getItem(NavigationConstants.MetaNavigation))
      : JSON.parse(localStorage.getItem(NavigationConstants.MetaNavigation));
    if (metaNavigation != null && !this._registry[NavigationConstants.Main]) {
      this.register(NavigationConstants.Main, metaNavigation.navigationItems);
      this.setCurrentNavigation(NavigationConstants.Main);
    } else {
      if (sessionStorage.getItem('Auth') || localStorage.getItem('Auth')) {
        const hash = metaNavigation ? metaNavigation.hash : null;
        this.isLoading = false;
        const userType =
          sessionStorage.getItem('IsDelegateUser') === 'true'
            ? null
            : this.userTypeService.getUserType();
        this.authSandbox.navigation(hash, userType).subscribe((response) => {
          if (response) {
            metaNavigation = this.updateNavigationIfChanged(
              response,
              metaNavigation
            );
          }
        });
      }
    }
  }

  public updateNavigationIfChanged(
    response: NavigationChangeDetector,
    metaNavigation: any
  ) {
    const productNavigations = response.data;
    const allowProductSelection =
      this._configService.appSettings.allowProductSelection;
    if (response.isModified) {
      const navList: NavigationItem[] = NavigationHelper.createNavMenu(
        allowProductSelection
          ? productNavigations.filter((x) => x.productName === 'steps')
          : productNavigations
      ); // here the value will come from selection menu

      this.unregister(NavigationConstants.Main);
      this.register(NavigationConstants.Main, navList);
      metaNavigation = {
        hash: response.hash,
        navigationItems: navList,
        ismodify: response.isModified,
      };
      if (sessionStorage.getItem('IsDelegateUser') === 'true') {
        sessionStorage.setItem(
          NavigationConstants.MetaNavigation,
          JSON.stringify(metaNavigation)
        );
      } else {
        sessionStorage.setItem(
          NavigationConstants.MetaNavigation,
          JSON.stringify(metaNavigation)
        );
        localStorage.setItem(
          NavigationConstants.MetaNavigation,
          JSON.stringify(metaNavigation)
        );
      }
      this.setCurrentNavigation(NavigationConstants.Main);
      this.isLoading = true;
    }
    return metaNavigation;
  }

  sortNavigation(navigation: Array<NavigationItem>): Array<NavigationItem> {
    const result: Array<NavigationItem> = navigation.sort(
      (a, b) => parseInt(a.order) - parseInt(b.order)
    );

    if (result && result != null && result.length > 0) {
      return JSON.parse(JSON.stringify(result));
    } else {
      return JSON.parse(JSON.stringify(navigation));
    }
  }

  public setDefendAgainstBrowserBackButton(value: boolean): void {
    this._defendAgainstBrowserBackButton = value;
  }

  public get defendAgainstBrowserBackButton(): boolean {
    return this._defendAgainstBrowserBackButton;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
