import { Injectable } from "@angular/core";
import { UserConsentApiClient } from './user-consent.apiClient.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'any'})
export class UserConsentSandbox {

    constructor(private readonly userConsentApiClient: UserConsentApiClient) {
    }

    createConsent(): Observable<any> {
        return this.userConsentApiClient.createConsent("");
    }
    getConsent(): Observable<any> {
        return this.userConsentApiClient.getConsent("Base", "1000");
    }
    getConsentAgreeement(): Observable<any> {
        return this.userConsentApiClient.getConsentAgreement("Base", "1000");
    }
    getPrivacyPolicy(): Observable<any> {
        return this.userConsentApiClient.getPrivacyPolicy("Base", "1000");
    }
    getTermsOfUse(): Observable<any> {
        return this.userConsentApiClient.getTermsOfUse("Base", "1000");
    }

}
