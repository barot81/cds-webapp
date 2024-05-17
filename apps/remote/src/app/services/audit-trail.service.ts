import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, MetaConstants } from '@zhealthcare/fusion/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AuditTrail } from '../models/audit-trail.model';

@Injectable({ providedIn: 'any' })
export class AuditTrailService extends HttpService {
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private activeRoute: ActivatedRoute
  ) {
    super();
  }


  protected getBaseUrl(): string {
    return this.configService.getservice('facility').endpoint;
  }

  private getBaseEndpoint(patientId?: string) {
    const facility = localStorage.getItem(MetaConstants.SelectedFacilityName );
    patientId = patientId ?? this.activeRoute.paramMap['id'];
    const url = `${this.getBaseUrl()}/${facility}/patients/${patientId}/Findings`;
    return url;
  }


  getAuditTrails(patientId: string): Observable<AuditTrail[]> {
    this.loading$.next(true);
    const url = this.getBaseEndpoint(patientId).replace("/Findings", "/auditTrails");
    return this.httpClient.get(url).pipe(
      tap(() => {
        this.loading$.next(false);
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }
}
