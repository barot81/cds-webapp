import { Injectable } from "@angular/core";
import { UserConsentApiClient } from './user-consent.apiClient.service';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'any'})
export class UserConsentSandbox {

    constructor(private readonly userConsentApiClient: UserConsentApiClient) {
    }

    createConsent(): Observable<any> {
        return this.userConsentApiClient.createConsent("");
    }
    getConsent(): Observable<any> {
        return of({});
    }
    getConsentAgreeement(): Observable<any> {
        return  of({});
    }
    getPrivacyPolicy(): Observable<any> {
        return  of({});
    }
    getTermsOfUse(): Observable<any> {
        return  of({});
    }

}
