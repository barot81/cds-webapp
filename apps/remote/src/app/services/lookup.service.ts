import { Injectable } from '@angular/core';
import { HttpService, MetaConstants } from '@zhealthcare/fusion/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import {
  APRDrgLookup,
  DrgLookup,
  MSDrgLookup,
  QueryDiagnosisLookup,
} from '../models/lookup.models';

@Injectable({ providedIn: 'any' })
export class LookupService extends HttpService {
  aprDrgLookups = [];
  msDrgLookups = [];
  diagnosisInfo: QueryDiagnosisLookup;
  physicians = [];
  loading$ = new BehaviorSubject<boolean>(false);

  protected getBaseUrl(): string {
    return this.configService.getservice('facility').endpoint;
  }

  constructor() {
    super();
  }

  public getBaseEndpoint() {
    const facility = localStorage.getItem(MetaConstants.SelectedFacilityName);
    const url = `${this.getBaseUrl()}/Facilities/${facility}`;
    return url;
  }

  public getPhycianNames() {
    if(this.physicians.length > 0)
      return of(this.physicians);
    const url = `${this.getBaseEndpoint()}/Physicians`;
    this.loading$.next(true);
    return this.httpClient.get<string[]>(url).pipe(
      map((x) =>
      {
        this.physicians = x;
        this.loading$.next(false);
        return x;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getDrgLookup(reimburmentType: string): Observable<DrgLookup[]> {
    if (reimburmentType === 'APR-DRG') {
      return this.getAprDrgLookup();
    }
    return this.getMsDrgLookup();
  }

  public getMsDrgLookup(): Observable<DrgLookup[]> {
    if(this.msDrgLookups.length > 0) {
      return of(this.msDrgLookups);
    }
    const url = `${this.getBaseUrl()}/Lookups/MsDrg`;
    this.loading$.next(true);
    return this.httpClient.get<MSDrgLookup>(url).pipe(
      map((x) => {
        this.msDrgLookups = x.items.map(
          (y) =>
            new DrgLookup(y.drgNo, y.drgTitle, y.weights, y.geometricMeanLos)
        );
        this.loading$.next(false);
        return this.msDrgLookups;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getAprDrgLookup(): Observable<DrgLookup[]> {
    if(this.aprDrgLookups.length > 0)
      return of(this.aprDrgLookups);
    const url = `${this.getBaseUrl()}/Lookups/AprDrg`;
    this.loading$.next(true);
    return this.httpClient.get<APRDrgLookup>(url).pipe(
      map((x) => {
        this.aprDrgLookups = x.items.map(
          (y) =>
            new DrgLookup(
              y.drgNo,
              y.drgDescription,
              y.relativeWeight,
              y.nationalAverageLos
            )
        );
        this.loading$.next(false);
        return this.aprDrgLookups;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getDiagnosisLookup() {
    if(this.diagnosisInfo?.items && this.diagnosisInfo.items.length > 0)
      return of(this.diagnosisInfo);
    const url = `${this.getBaseUrl()}/Lookups/QueryDiagnosis`;
    this.loading$.next(true);
    return this.httpClient.get<QueryDiagnosisLookup>(url).pipe(
      map((x) => {
        this.diagnosisInfo = x;
        this.loading$.next(false);
        return x;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }
}
