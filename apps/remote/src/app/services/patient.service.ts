import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, MetaConstants } from '@zhealthcare/fusion/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import {
  GeneralComment,
  PatientComment,
} from '../models/general-comments.model';
import { Patient } from '../models/patient.model';
import { generatePatients } from './patient.faker.service';

@Injectable({ providedIn: 'any' })
export class PatientService extends HttpService {
  patients = [];
  currentPatient = new Patient();
  currentPatient$ = new BehaviorSubject<Patient>(new Patient());
  patientData$ = new BehaviorSubject<Patient[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  public onAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  protected getBaseUrl(): string {
    return this.configService.getservice('facility').endpoint;
  }

  constructor() {
    super();
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
      tap((x) => {
        this.currentPatient$.next(x);
        this.currentPatient = x;
        this.loading$.next(false);
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  public getBaseEndpoint() {
    const facility = localStorage.getItem(MetaConstants.SelectedFacilityName);
    const url = `${this.getBaseUrl()}/${facility}/patients`;
    return url;
  }

  public getDatasourceBaseEndpoint() {
    const facility = localStorage.getItem(MetaConstants.SelectedFacilityName);
    const url = `${this.getBaseUrl()}/${facility}/patientsInfo`;
    return url;
  }

  public getPhycianNames() {
    const url = `${this.getBaseEndpoint()}`;
    this.loading$.next(true);
    return this.httpClient.get<Patient>(url).pipe(
      tap((x) => this.loading$.next(false)),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
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

  updatePatientComments(patientComment: PatientComment) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .put(
        `${this.getBaseEndpoint()}/${patientComment.id}/comments`,
        patientComment,
        {
          headers: headers,
        }
      )
      .pipe(
        map((x) => {
          if (this.currentPatient) {
            this.currentPatient.reviewStatus = patientComment.reviewStatus;
            if (this.currentPatient.generalComment.comments) {
              this.currentPatient.generalComment = patientComment.generalComment;
              this.currentPatient.followupComments.unshift(
                patientComment.generalComment
              );
            }
            this.currentPatient$.next(this.currentPatient);
          } else {
            if (!this.patients) this.patients = [];
            const currentPatient = this.getUpdatedPatient(patientComment);
            this.patients.push(currentPatient);
            this.currentPatient$.next(currentPatient);
          }
          this.patientData$.next(this.patients);
          return x;
        })
      );
  }

  private getUpdatedPatient(patientComment: PatientComment) {
    if (!this.currentPatient) {
      this.currentPatient = new Patient();
      this.currentPatient.id = patientComment.id;
    }

    if (patientComment.generalComment?.comments) {
      this.currentPatient.generalComment = patientComment.generalComment;
      this.currentPatient.followupComments = [patientComment.generalComment];
    }
    this.currentPatient.reviewStatus = patientComment.reviewStatus;
    return this.currentPatient;
  }

  updaetReviewStatus(patientId: string, reviewStatus: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient
      .put(
        `${this.getBaseEndpoint()}/${patientId}/reviewStatus`,
        { reviewStatus: reviewStatus },
        {
          headers: headers,
        }
      )
      .pipe(
        map((x) => {
          const existingPatient = this.patients.find((y) => y.id === patientId);
          if (existingPatient) {
            existingPatient.reviewStatus = reviewStatus;
            this.currentPatient = existingPatient;
            this.currentPatient$.next(this.currentPatient);
            this.patientData$.next(this.patients);
          } else {
            if (!this.patients) this.patients = [];
            this.currentPatient = this.getUpdatedPatient({
              id: patientId,
              generalComment: new GeneralComment(),
              reviewStatus: reviewStatus,
            });
            this.currentPatient$.next(this.currentPatient);
            this.patients.push(this.currentPatient);
            this.patientData$.next(this.patients);
          }

          // this.updatedStatus$.next(reviewStatus);
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
}
