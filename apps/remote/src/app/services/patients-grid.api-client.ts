import { Injectable } from "@angular/core";
import { GET, HttpService, Path } from "@zhealthcare/fusion/core";
import { Observable } from "rxjs";


export class PatientGridApiClient  {
  serviceEndpoint;
  constructor() { }

  setBaseUrl(endpoint) {
    this.serviceEndpoint = endpoint;
  }

  // getBaseUrl() {
  //   if(this.serviceEndpoint)
  //     return this.serviceEndpoint;
  //   return this.configService.getservice('facility').endpoint;
  // }

  // @GET<any[]>('/{facilityId}/patientsInfo')
  // public getStudentComplianceList(
  //   @Path('facilityId') facilityId: string
  // ): Observable<any[]> {
  //   return null;
  // }

}
