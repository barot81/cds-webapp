import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { FakePatient } from '../models/fake-patient.model';
import { Patient } from '../models/patient.model';
import { generatePatients } from './patient.faker.service';

@Injectable({ providedIn: 'any' })
export class PatientService {
  patients;
  patientData$ = new BehaviorSubject<Patient[]>(null);
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
    const url = this.getEndpoint();
    return this.httpClient.get(url).pipe(
      map((patients: any[]) => {
        this.patientData$.next(patients);
      })
    );
    // return this.generateFakePatients(facility);
  }

  public getEndpoint() {
    const facility = localStorage.getItem('TenantId');
    const url = `${environment.baseUrl}/api/Facilities/${facility}/patients`;
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

  addPatient(patient: FakePatient) {
    this.patients.push(patient);
    this.patientData$.next(this.patients);
    return this.patientData$;
  }

  updatePatient(patient: FakePatient) {
    this.patients.splice(
      this.patients.indexOf((x) => x.id === patient.id),
      1,
      patient
    );
    this.patientData$.next(this.patients);
    return this.patientData$;
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
