import { Injectable } from '@angular/core';
import { HttpService, MetaConstants } from '@zhealthcare/fusion/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import {
  APRDrgLookup,
  DrgLookup,
  MSDrgLookup,
  QueryDiagnosisLookup,
} from '../models/lookup.models';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'any' })
export class LookupService extends HttpService {
  patients = [];
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
    const url = `${this.getBaseEndpoint()}/Physicians`;
    this.loading$.next(true);
    return this.httpClient.get<string[]>(url).pipe(
      tap((x) => this.loading$.next(false)),
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
    const url = `${this.getBaseUrl()}/Lookups/MsDrg`;
    this.loading$.next(true);
    return this.httpClient.get<MSDrgLookup>(url).pipe(
      map((x) => {
        this.loading$.next(false);
        return x.items.map(
          (y) =>
            new DrgLookup(y.drgNo, y.drgTitle, y.weights, y.geometricMeanLos)
        );
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getAprDrgLookup(): Observable<DrgLookup[]> {
    const url = `${this.getBaseUrl()}/Lookups/AprDrg`;
    this.loading$.next(true);
    return this.httpClient.get<APRDrgLookup>(url).pipe(
      map((x) => {
        this.loading$.next(false);
        return x.items.map(
          (y) =>
            new DrgLookup(
              y.drgNo,
              y.drgDescription,
              y.relativeWeight,
              y.nationalAverageLos
            )
        );
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getDiagnosisLookup() {
    const url = `${this.getBaseUrl()}/Lookups/QueryDiagnosis`;
    this.loading$.next(true);
    return this.httpClient.get<QueryDiagnosisLookup>(url).pipe(
      tap((x) => this.loading$.next(false)),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }
}
