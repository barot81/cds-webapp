import { Injectable } from '@angular/core';
import {
  GET,
  Path,
  HttpService,
} from '@exxat/fusion/core';
import { Validations } from '@exxat/fusion/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class FormValidationAPIClient extends HttpService {
  public serviceName: string;

  constructor() {
    super();
  }

  getBaseUrl(): string {
    return this.configService.getservice(this.serviceName).endpoint;
  }

  @GET<Validations>('/validation/{validationId}')
  public getValidationJson( @Path('validationId') validationId: string): Observable<Validations> {
    return null;
  }
}
