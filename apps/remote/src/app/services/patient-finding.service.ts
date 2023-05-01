import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Finding } from '../models/Finding.model';
import { Patient } from '../models/patient.model';

@Injectable({ providedIn: 'any' })
export class PatientFindingService {
  patientFinding;
  patientFindingData$ = new BehaviorSubject<Finding[]>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  public bulkUpdateCompletionStatus = new BehaviorSubject<any>(null);
  bulkUpdateCompletionStatus$ = this.bulkUpdateCompletionStatus.asObservable();
  public onAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private activeRoute: ActivatedRoute
  ) {
    this.onAdded = new BehaviorSubject<boolean>(false);
    this.onFilterChange = new BehaviorSubject<boolean>(false);
  }

  profileListLoaded(data: { result: any; count: number }) {
    this.patientFindingData$.next(data.result);
  }

  getPatientFindingsByPatientId() {
    this.loading$.next(true);
    const url = this.getBaseEndpoint();
    return this.httpClient.get(url).pipe(
      map((patientFinding: any[]) => {
        this.patientFinding = patientFinding;
        this.patientFindingData$.next(patientFinding);
        this.loading$.next(false);
        return patientFinding;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }
  getPatientFindingById(id: string): Observable<Finding> {
    const patientFinding = this.patientFinding.find((x) => x.id == id);
    if (patientFinding) {
      return of(patientFinding);
    } else {
      return this.getPatientFindingsByPatientId().pipe(map(x=>x.filter(x=>x.id== id)));
    }

  }

  private getBaseEndpoint() {
    const facility = localStorage.getItem('TenantId');
    const patientId = this.activeRoute.paramMap['id'];
    const url = `${environment.baseUrl}/api/${facility}/patients/${patientId}/patientFinding`;
    return url;
  }

  addPatientFinding(patientFinding: Finding) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.getBaseEndpoint(), patientFinding, {
        headers: headers,
      })
      .pipe(
        map((x) => {
          this.patientFinding.push(patientFinding);
          this.patientFindingData$.next(this.patientFinding);
          return x;
        })
      );
  }

  updatePatientFinding(patientFinding: Finding) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .put(`${this.getBaseEndpoint()}/${patientFinding.id}`, patientFinding, {
        headers: headers,
      })
      .pipe(
        map((x) => {
          this.patientFinding.splice(
            this.patientFinding.indexOf((y) => y.id === patientFinding.id),
            1,
            patientFinding
          );
          this.patientFindingData$.next(this.patientFinding);
          return x;
        })
      );
  }

  deleteePatientFinding(id: any) {
    this.patientFinding.splice(
      this.patientFinding.indexOf((x) => x.id === id),
      1
    );
    this.patientFindingData$.next(this.patientFinding);
    return this.patientFindingData$;
  }
}
