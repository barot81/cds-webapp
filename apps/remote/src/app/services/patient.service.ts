import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { generatePatients } from './patient.faker.service';

@Injectable({providedIn: 'any'})
export class PatientService {

  patientData$ =  new BehaviorSubject<any>(null);;
  public bulkUpdateCompletionStatus = new BehaviorSubject<any>(null);
  bulkUpdateCompletionStatus$ = this.bulkUpdateCompletionStatus.asObservable();
  public onStudentAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  profileListLoaded(data:{result:any, count:number}) {
    this.patientData$.next(data);
  }

  getPatients(facility: string) {
    const patients = generatePatients(100);
    patients.filter(x=>x.facility === facility).map(x=>{
      if(x.queryStatus == 'Open')
        x.statusClass = 'approved';
      else
        x.statusClass = 'disapproved';
    })
    this.patientData$.next(patients);
    return patients;
  }
}
