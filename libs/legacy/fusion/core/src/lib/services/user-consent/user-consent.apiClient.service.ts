import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Body, GET, Header, HttpService, POST } from "../../asyncServices/http";

@Injectable({providedIn: 'any'})
export class UserConsentApiClient extends HttpService {
    config;

    constructor() {
        super();
        this.config = this.configService.appSettings.auth.endpoint;
    }

    getBaseUrl(): string {
        return this.config;
    }

    @POST("/UserConsent/CreateConsent", null)
    public createConsent(@Body body: any): Observable<any> {
        return null;
    }


    @GET<any>('/UserConsent/GetConsent')
    public getConsent(@Header('TenantId') header: string,
        @Header('Oucodes') oucodes: string): Observable<any> {
        return null;
    }

    @GET<any>('/UserConsent/GetConsentAgreement')
    public getConsentAgreement(@Header('TenantId') header: string,
        @Header('Oucodes') oucodes: string): Observable<any> {
        return null;
    }

    @GET<any>('/UserConsent/GetPrivacyPolicy')
    public getPrivacyPolicy(@Header('TenantId') header: string,
        @Header('Oucodes') oucodes: string): Observable<any> {
        return null;
    }

    @GET<any>('/UserConsent/GetTermsOfUse')
    public getTermsOfUse(@Header('TenantId') header: string,
        @Header('Oucodes') oucodes: string): Observable<any> {
        return null;
    }
}
