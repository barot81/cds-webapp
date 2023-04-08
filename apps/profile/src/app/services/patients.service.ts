import { Injectable } from '@angular/core';
import {
  FusionConfigService, HttpService,
} from '@zhealthcare/fusion/core';
// import { Operation } from 'fast-json-patch';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { generatePatients } from './patient.faker.service';


type GUID = string & { isGuid: true };

@Injectable({providedIn: 'any'})
export class PatientsService extends HttpService {
  public onStudentAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;
  constructor(
    protected _fusionConfigService: FusionConfigService,
  ) {
    super();
    this.onStudentAdded = new BehaviorSubject<boolean>(false);
    this.onFilterChange = new BehaviorSubject<boolean>(false);
  }

  getBaseUrl() {
    return this._fusionConfigService.getservice('student.profile').endpoint;
  }

  public getALLProfile(payload: any): Observable<any> {
    const patients = generatePatients(15);
    return of(patients);
  }
}
