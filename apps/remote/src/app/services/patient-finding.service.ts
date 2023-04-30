import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Finding } from '../models/Finding.model';
import { Patient } from '../models/patient.model';
import { generatePatients } from './patient.faker.service';

@Injectable({ providedIn: 'any' })
export class PatientFindingService {
  patientFinding;
  patientFindingData$ = new BehaviorSubject<Finding[]>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  public bulkUpdateCompletionStatus = new BehaviorSubject<any>(null);
  bulkUpdateCompletionStatus$ = this.bulkUpdateCompletionStatus.asObservable();
  public onAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient, private activeRoute: ActivatedRoute) {
    this.onAdded = new BehaviorSubject<boolean>(false);
    this.onFilterChange = new BehaviorSubject<boolean>(false);
  }

  profileListLoaded(data: { result: any; count: number }) {
    this.patientFindingData$.next(data.result);
  }

  getPatientFindings() {
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
  getPatientById(id: string): Observable<Patient> {
    const url = `${this.getBaseEndpoint()}/${id}`;
    this.loading$.next(true);
    return this.httpClient
      .get<Patient>(url)
      .pipe(
        tap((x) => this.loading$.next(false)),
        catchError((err) => {
          this.loading$.next(false);
          return of(err);
      }));
  }

  public getBaseEndpoint() {
    const facility = localStorage.getItem('TenantId');
    const patientId = this.activeRoute.paramMap['id'];
    const url = `${environment.baseUrl}/api/Facilities/${facility}/patients/${patientId}/patientFinding`;
    return url;
  }

  private generateFakePatients(facility: string) {
    this.patientFinding = generatePatients(100);
    this.patientFinding
      .filter((x) => x.facility === facility)
      .map((x) => {
        if (x.queryStatus.includes('pending') || x.queryStatus.includes('No'))
          x.statusClass = 'disapproved';
        else x.statusClass = 'approved';
      });
    this.patientFindingData$.next(this.patientFinding);
    console.log(JSON.stringify(this.patientFinding));
    return this.patientFinding;
  }

  addPatient(patient: Patient) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .post(this.getBaseEndpoint(), patient, {
        headers: headers,
      })
      .pipe(
        map((x) => {
          this.patientFinding.push(patient);
          this.patientFindingData$.next(this.patientFinding);
          return x;
        })
      );
  }

  updatePatient(patient: Patient) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .put(`${this.getBaseEndpoint()}/${patient.id}`, patient, {
        headers: headers,
      })
      .pipe(
        map((x) => {
          this.patientFinding.splice(
            this.patientFinding.indexOf((y) => y.id === patient.id),
            1,
            patient
          );
          this.patientFindingData$.next(this.patientFinding);
          return x;
        })
      );
  }

  deleteePatient(id: any) {
    this.patientFinding.splice(
      this.patientFinding.indexOf((x) => x.id === id),
      1
    );
    this.patientFindingData$.next(this.patientFinding);
    return this.patientFindingData$;
  }
}
