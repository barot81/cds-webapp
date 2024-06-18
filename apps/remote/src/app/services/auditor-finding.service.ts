import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService, MetaConstants } from '@zhealthcare/fusion/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Finding } from '../models/Finding.model';

@Injectable({ providedIn: 'any' })
export class AuditorFindingService extends HttpService {
  auditorFinding;
  auditorFindingData$ = new BehaviorSubject<Finding[]>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  public onFilterChange: BehaviorSubject<boolean>;

  constructor(
    private activeRoute: ActivatedRoute
  ) {
    super();
    this.onFilterChange = new BehaviorSubject<boolean>(false);
  }


  protected getBaseUrl(): string {
    return this.configService.getservice('facility').endpoint;
  }

  profileListLoaded(data: { result: any; count: number }) {
    this.auditorFindingData$.next(data.result);
  }

  getFindingsByPatientId(patientId: string): Observable<Finding[]> {
    this.loading$.next(true);
    const url = this.getBaseEndpoint(patientId);
    return this.httpClient.get(url).pipe(
      map((patientFinding: Finding[]) => {
        this.auditorFinding = patientFinding;
        this.auditorFindingData$.next(patientFinding);
        this.loading$.next(false);
        return patientFinding;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  getFindingById(patientId: string, id: string): Observable<Finding> {
    const patientFinding = this.auditorFinding.find((x) => x.id == id);
    if (patientFinding) {
      return of(patientFinding);
    } else {
      return this.getFindingsByPatientId(patientId).pipe(map(x=>x.find(x=>x.id == id)));
    }

  }

  private getBaseEndpoint(patientId: string) {
    const facility = localStorage.getItem(MetaConstants.SelectedFacilityName );
    patientId = patientId ?? this.activeRoute.paramMap['id'];
    const url = `${this.getBaseUrl()}/${facility}/patients/${patientId}/auditorFindings`;
    return url;
  }

  addPatientFinding(patientId: string, patientFinding: Finding) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.getBaseEndpoint(patientId), patientFinding, {
        headers: headers,
      })
      .pipe(
        map((x:Finding) => {
          patientFinding.id = x.id;
          this.auditorFinding.push(patientFinding);
          this.auditorFindingData$.next(this.auditorFinding);
          return x;
        })
      );
  }

  updatePatientFinding(patientId: string, patientFinding: Finding) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .put(`${this.getBaseEndpoint(patientId)}/${patientFinding.id}`, patientFinding, {
        headers: headers,
      })
      .pipe(
        map((x) => {
          const index = this.auditorFinding.findIndex((y) => y.id === patientFinding.id);
          this.auditorFinding.splice(
            index,
            1,
            patientFinding
          );
          this.auditorFindingData$.next(this.auditorFinding);
          return x;
        })
      );
  }

  deletePatientFinding(id: any) {
    this.auditorFinding = this.auditorFinding.splice(
      this.auditorFinding.indexOf((x) => x.id === id),
      1
    );
    this.auditorFindingData$.next(this.auditorFinding);
    return this.auditorFindingData$;
  }
}
