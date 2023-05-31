import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HashDataModel,
  NavigationChangeDetector,
  OrgUnit,
  Organization,
  FacilityWiseStatuses,
  LaunchDataModel,
  ProductNavigation,
} from '@zhealthcare/fusion/models';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OrgFacade } from '../../store/facades/org.facade';
import { UserTypeService } from './user.type.service';
import { navigations } from './nav/navigations';

@Injectable({ providedIn: 'any' })
export class AuthSandbox {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly orgFacade: OrgFacade,
    protected userTypeService: UserTypeService
  ) {}

  public launch(): Observable<LaunchDataModel[]> {
    return this.authService.Launch('Base', '1000').pipe(
      catchError((error) => {
        console.log(`Your Token is not valid for launch api.${error}`);
        return of(null);
      })
    );
  }
  public role(
    hash: string,
    selectedTenant: string,
    selectedOucode: string,
    isFaculty: boolean = false,
    isViewAsStudent: boolean = false
  ): Observable<HashDataModel[]> {
    return this.authService
      .Role(
        'Base',
        '1000',
        selectedTenant,
        selectedOucode,
        hash,
        isFaculty,
        isViewAsStudent
      )
      .pipe(
        catchError((error) => {
          console.log(`Your Token is not valid for role api.${error}`);
          return of(null);
        })
      );
  }

  public navigation(
    hash: string,
    userType?: string
  ): Observable<NavigationChangeDetector> {
    // const selectedTenantId = this.userTypeService.currentTenantId;
    // const selectedOucode = this.userTypeService.currentOucode;
    // const isFaculty = this.userTypeService.isFacultyPersonaSelected();
    // console.log(navigations);
    return of(<NavigationChangeDetector>navigations);
  }

  // })
  public getOrgUnit(id): Observable<OrgUnit> {
    return this.authService.getOrgUnit(id);
  }

  public getOrganization(id): Observable<Organization> {
    return this.authService.getOrganization(id);
  }

  public getOrgUnitInfo(oucodes): Observable<OrgUnit[]> {
    return this.authService.getOrgUnitInfo(oucodes);
  }

  // public
}
