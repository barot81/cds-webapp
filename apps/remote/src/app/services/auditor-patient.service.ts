import { Injectable } from "@angular/core";
import { HttpService, MetaConstants } from "@zhealthcare/fusion/core";
import { BehaviorSubject, map, catchError, of, Observable, tap } from "rxjs";
import { Patient } from "../models/patient.model";

@Injectable({ providedIn: 'any' })
export class AuditorPatientService extends HttpService {
  pdPatients = [];
  currentPdPatient = new Patient();
  currentPdPatient$ = new BehaviorSubject<Patient>(new Patient());
  pdPatientData$ = new BehaviorSubject<Patient[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  public onAdded: BehaviorSubject<boolean>;
  public onFilterChange: BehaviorSubject<boolean>;

  constructor() {
    super();
    this.onAdded = new BehaviorSubject<boolean>(false);
    this.onFilterChange = new BehaviorSubject<boolean>(false);
  }

  protected getBaseUrl(): string {
    return this.configService.getservice('facility').endpoint;
  }

  public getBaseEndpoint() {
    const facility = localStorage.getItem(MetaConstants.SelectedFacilityName);
    const url = `${this.getBaseUrl()}/${facility}/pdPatients`;
    return url;
  }


  getPatientById(id: string): Observable<Patient> {
    const url = `${this.getBaseEndpoint()}/${id}`;
    this.loading$.next(true);
    return this.httpClient.get<Patient>(url).pipe(
      tap((x) => {
        this.currentPdPatient$.next(x);
        this.currentPdPatient = x;
        this.loading$.next(false);
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  profileListLoaded(data: { result: any; count: number }) {
    this.pdPatientData$.next(data.result);
  }

  getPatients() {
    this.loading$.next(true);
    const url = this.getBaseEndpoint();
    return this.httpClient.get(url).pipe(
      map((patients: any[]) => {
        this.pdPatients = patients;
        this.pdPatientData$.next(patients);
        this.loading$.next(false);
        return patients;
      }),
      catchError((err) => {
        this.loading$.next(false);
        return of(err);
      })
    );
  }

  getAuditorDashboard() {
    this.loading$.next(true);
    const url = `${this.getBaseUrl()}/AuditorDashboard`;
    return this.httpClient.get(url);
  }
}
