import { HttpClient } from '@angular/common/http';

import { THeaders } from './typings';
import { AppInjector } from './utils';

export abstract class ExtendedHttpClient {

  private http!: HttpClient;

  constructor() {
    this.http = AppInjector.get(HttpClient);
  }

  getBaseUrl(): string {
    return '';
  }

  getDefaultHeaders(): THeaders {
    return {};
  }
}
