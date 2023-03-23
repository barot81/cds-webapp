import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class CustomStorageService implements OAuthStorage {

  private _data: any = {};
  private needsStorage(key: string) {
    return !(key === 'access_token' || key === 'refresh_token' || key === 'id_token');
  }

  getItem(key: string) {
    if (this.needsStorage(key)) {
      return sessionStorage.getItem(key);
    }
    return this._data[key];
  }

  removeItem(key: string) {
    if (this.needsStorage(key)) {
      return sessionStorage.removeItem(key);
    }
    return delete this._data[key];
  }

  setItem(key: string, data: string) {
    if (this.needsStorage(key)) {
      return sessionStorage.setItem(key, data);
    }
    return (this._data[key] = data);
  }
}
