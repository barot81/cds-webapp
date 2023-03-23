import { Injectable } from '@angular/core';
import { Sandbox } from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';
import { ResourceApiClient } from './resource.ApiClient';

@Injectable({providedIn: 'any'})
export class ResourceSandbox extends Sandbox {

    constructor(private resourceApiClient: ResourceApiClient) {
        super();
    }

    public getResources(): Observable<any[]> {
        return this.resourceApiClient.getResources();
    }

    getActiveSubscriptions(): Observable<any[]> {
        return this.resourceApiClient.getActiveSubscriptions();
    }
    getStudentActiveSubscriptions(studentId:string, cohortId:string): Observable<any[]> {
        return this.resourceApiClient.getStudentActiveSubscriptions(studentId, cohortId);
    }
}
