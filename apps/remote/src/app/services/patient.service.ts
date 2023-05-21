import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { PatientFilters } from '../models/datasource/patient-filters.model';
import { Patient } from '../models/patient.model';
import { generatePatients } from './patient.faker.service';

@Injectable({ providedIn: 'any' })
export class PatientService {
  patients = [];
  patientData$ = new BehaviorSubject<Patient[]>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  public bulkUpdateCompletionStatus = new BehaviorSubject<any>(null);
  bulkUpdateCompletionStatus$ = this.bulkUpdateCompletionStatus.asObservable();
  public onAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.onAdded = new BehaviorSubject<boolean>(false);
    this.onFilterChange = new BehaviorSubject<boolean>(false);
  }

  profileListLoaded(data: { result: any; count: number }) {
    this.patientData$.next(data.result);
  }

  getPatients() {
    this.loading$.next(true);
    const url = this.getBaseEndpoint();
    return this.httpClient.get(url).pipe(
      map((patients: any[]) => {
        this.patients = patients;
        this.patientData$.next(patients);
        this.loading$.next(false);
        return patients;
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
    return this.httpClient.get<Patient>(url).pipe(
      tap((x) => this.loading$.next(false)),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getBaseEndpoint() {
    const facility = localStorage.getItem('TenantId');
    const url = `${environment.baseUrl}/api/${facility}/patients`;
    return url;
  }

  public getDatasourceBaseEndpoint() {
    const facility = localStorage.getItem('TenantId');
    const url = `${environment.baseUrl}/api/${facility}/patientsInfo`;
    return url;
  }

  private generateFakePatients(facility: string) {
    this.patients = generatePatients(100);
    this.patients
      .filter((x) => x.facility === facility)
      .map((x) => {
        if (x.queryStatus.includes('pending') || x.queryStatus.includes('No'))
          x.statusClass = 'disapproved';
        else x.statusClass = 'approved';
      });
    this.patientData$.next(this.patients);
    console.log(JSON.stringify(this.patients));
    return this.patients;
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
          this.patients.push(patient);
          this.patientData$.next(this.patients);
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
          this.patients.splice(
            this.patients.findIndex((y) => y.id === patient.id),
            1,
            patient
          );
          this.patientData$.next(this.patients);
          return x;
        })
      );
  }

  deleteePatient(id: any) {
    this.patients.splice(
      this.patients.indexOf((x) => x.id === id),
      1
    );
    this.patientData$.next(this.patients);
    return this.patientData$;
  }

  applyFilter(filters: PatientFilters) {
    const filterParams = this.getFilterParams(filters);
    const endpoint = `${this.getBaseEndpoint()}?${this.getFilterParams(filters)}`;
  }

  getFilterParams(filters: PatientFilters) {
    let qParams = '';
    if (filters.status && filters.status.length > 0) {
      filters.status.forEach((x) => {
        qParams += `filters.status=${x}&`;
      });
    }
    if (filters.queryStatus && filters.queryStatus.length > 0) {
      filters.queryStatus.forEach((x) => {
        qParams += `filters.queryStatus=${x}&`;
      });
    }
    if (filters.admissionStartDate) {
      qParams += `filters.admissionStartDate=${filters.admissionStartDate}&filters.admissionEndDate=${filters.admissionEndDate}`;
    }
    if (filters.dischargeStartDate) {
      qParams += `filters.dischargeStartDate=${filters.dischargeStartDate}&filters.dischargeEndDate=${filters.dischargeEndDate}`;
    }
    return qParams;
  }
}
