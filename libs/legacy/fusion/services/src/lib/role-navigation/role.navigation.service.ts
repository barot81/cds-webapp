import { Injectable } from '@angular/core';
import { AuthSandbox, UserTypeService } from '@exxat/fusion/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleNavigation, HashDataModel, NavigationItem } from '@exxat/fusion/models';
import { NavigationConstants } from '../navigation/navigation.constants';

@Injectable({providedIn: 'any'})
export class RoleNavigationService {
  public navigationMeta;

  private readonly _unsubscribe: Subject<any>;
  public routeURLSource = new Subject<any>();
  public routeRequestSource = new Subject<any>();
  public routeModifierSource = new Subject<any>();
  public routeModifiedSource = new Subject<any>();
  public modifyRouteSource = new Subject<any>();
  public navigations = new BehaviorSubject<any>(null);
  navData: HashDataModel[];
  routeURL$ = this.routeURLSource.asObservable();
  routeRequest$ = this.routeRequestSource.asObservable();
  navigations$ = this.navigations.asObservable();
  constructor(
    private readonly authSandbox: AuthSandbox,
    private userTypeService: UserTypeService
  ) {
    this._unsubscribe = new Subject();

    if (sessionStorage.getItem(NavigationConstants.MetaNavigation)) {
      this.navigationMeta = JSON.parse(
        sessionStorage.getItem(NavigationConstants.MetaNavigation)
      );
    } else if (localStorage.getItem(NavigationConstants.MetaNavigation)) {
      this.navigationMeta = JSON.parse(
        localStorage.getItem(NavigationConstants.MetaNavigation)
      );
    }
    this.checkNavigationExtra(this.navigationMeta);
  }

  checknavigation() {
    this.navigationMeta = sessionStorage.getItem(
      NavigationConstants.MetaNavigation
    )
      ? JSON.parse(sessionStorage.getItem(NavigationConstants.MetaNavigation))
      : JSON.parse(localStorage.getItem(NavigationConstants.MetaNavigation));
    this.checkNavigationExtra(this.navigationMeta);
  }

  getCurrentNavigationChilds(url: string): Observable<RoleNavigation[]> {
    return this.navigations.pipe(
      map((response) => {
        if (response && response != null && response.length > 0) {
          let menuItemList = new Array<NavigationItem>();

          // Check For menu-group // menu-item;

          response.forEach((item) => {
            if (item && item != null && item.type && item.type != null) {
              if (
                item.type.toString().trim().toLowerCase() ===
                'menu-group'.toString().trim().toLowerCase()
              ) {
                const menuItems = this.getMenuItemList(item);
                if (menuItems && menuItems != null) {
                  menuItemList = menuItemList.concat(menuItems);
                }
              } else if (
                item.type.toString().trim().toLowerCase() ===
                'menu-item'.toString().trim().toLowerCase()
              ) {
                menuItemList.push(item);
              }
            }
          });

          let currentNavigationChilds = [];
          const navs = menuItemList.filter((x) => x.url === url);
          if (navs.length > 0) {
            navs.forEach((element) => {
              currentNavigationChilds = this.UrlMatcher(element, url);
            });
          } else {
            response.forEach((element) => {
              if (
                currentNavigationChilds === null ||
                currentNavigationChilds === undefined
              )
                currentNavigationChilds = this.UrlMatcher(element, url);
            });
          }
          return currentNavigationChilds;
        }
        return [];
      })
    );
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

  private checkNavigationExtra(navigationMeta: any) {
    if (!this.navigationMeta) {
      this.authSandbox
        .navigation(null, this.userTypeService.getUserType())
        .subscribe((response: any) => {
          if (response) {
            const actionArr: Object = { actions: response.data.actions };
            const combined = [].concat(response.data.menus, actionArr);
            this.navigations.next(combined);
          }
        });
    } else {
      const actionArr: Object = { actions: this.navigationMeta.data.actions };
      const combined = [].concat(this.navigationMeta.data.menus, actionArr);
      this.navigations.next(combined);
    }
  }

  UrlMatcher(element, url): RoleNavigation[] {
    if (element.url != null) {
      if (url.includes(element.url)) {
        return this.getNavigationIfUrlMatch(url, element);
      } else {
        if (element.children.length > 0 && url.includes(element.url)) {
          return this.getNavigationIfUrlMatch(url, element);
        }
      }
    }
    return [];
  }

  getNavigationIfUrlMatch(url, element): RoleNavigation[] {
    if (url === element.url) {
      return element.children;
    } else {
      if (
        element.children.map(({ urls }) => url).some((res) => url.includes(res))
      ) {
        return element.children;
      } else {
        return new Array<RoleNavigation>();
      }
    }
  }

  routeURL(url: string) {
    this.routeURLSource.next(url);
  }

  routeRequest(url: string) {
    this.routeRequestSource.next(url);
  }

  routeModifier(navigations) {
    this.routeModifierSource.next(navigations);
  }

  modifiedRoute(navigations) {
    this.routeModifiedSource.next(navigations);
  }

  modifyRoute(navigations) {
    this.modifyRouteSource.next(true);
    this.modifyRouteSource.next(navigations);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
