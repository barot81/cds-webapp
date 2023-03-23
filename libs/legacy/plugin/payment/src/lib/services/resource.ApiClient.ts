import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET, Header, HttpService } from '@zhealthcare/fusion/core';

@Injectable({providedIn: 'any'})
export class ResourceApiClient extends HttpService {
    config;

    constructor() {
        super();
        this.config = this.configService.getservice('payment').endpoint;
    }

    getBaseUrl(): string {
        return this.config;
    }

    @GET<any[]>('/Home')
    public getResources(): Observable<any> {
        return null;
    }

    @GET<any[]>('/Home/ActiveSubscriptions')
    public getActiveSubscriptions(): Observable<any> {
        return null;
    }

    @GET<any[]>('/Home/StudentActiveSubscriptions')
    public getStudentActiveSubscriptions(@Header('StudentId') studentId: string, @Header('CohortId') cohortId: string): Observable<any> {
        return null;
    }
}
