import {
  HttpService,
  GET,
  Path,
  Header
} from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';
import {
  LookupMap,
  Lookup
} from '@zhealthcare/fusion/models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class LookupAPIClient extends HttpService {
  public serviceName: string;

  constructor() {
    super();

  }

  getBaseUrl(): string {
    return  this.configService.getservice(this.serviceName).endpoint;
  }

  @GET<LookupMap>('/lookup')
  public getLookupList(
    @Header('OucodeName') OucodeName
  ): Observable<LookupMap> {
    return null;
  }

  @GET<Lookup>('/lookup/{name}')
  public getLookupByName(
    @Path('name') name: string,
    @Header('OucodeName') OucodeName
  ): Observable<Lookup> {
    return null;
  }

  @GET<Lookup>('/lookup/{name}/{tag}')
  public getLookupByNameAndTag(
    @Path('name') name: string,
    @Path('tag') tag: string,
    @Header('OucodeName') OucodeName
  ): Observable<Lookup> {
    return null;
  }
}
