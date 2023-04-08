import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from '../models/patient.model';
import { generatePatients } from './patient.faker.service';

@Injectable({providedIn: 'any'})
export class PatientService {
  patients;
  patientData$ =  new BehaviorSubject<any>(null);;
  public bulkUpdateCompletionStatus = new BehaviorSubject<any>(null);
  bulkUpdateCompletionStatus$ = this.bulkUpdateCompletionStatus.asObservable();
  public onStudentAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  profileListLoaded(data:{result:any, count:number}) {
    this.patientData$.next(data);
  }

  getPatients() {
    const facility = localStorage.getItem('TenantId');
    this.patients = generatePatients(100);
    this.patients.filter(x=>x.facility === facility).map(x=>{
      if(x.queryStatus == 'Open')
        x.statusClass = 'approved';
      else
        x.statusClass = 'disapproved';
    })
    this.patientData$.next(this.patients);
    return this.patients;
  }

  addPatient(patient: Patient) {
    this.patients.push(patient);
    this.patientData$.next(this.patients);
    return this.patientData$;
  }

  updatePatient(patient: Patient) {
    this.patients.splice(this.patients.indexOf(x=>x.id === patient.id),1, patient);
    this.patientData$.next(this.patients);
    return this.patientData$;
  }

  deleteePatient(id: any) {
    this.patients.splice(this.patients.indexOf(x=>x.id === id), 1);
    this.patientData$.next(this.patients);
    return this.patientData$;
  }
}
