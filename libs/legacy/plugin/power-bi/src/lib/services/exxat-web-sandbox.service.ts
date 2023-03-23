import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Sandbox } from '@zhealthcare/fusion/core';
import { PowerBIApiClient } from './zhealthcare-web-api-client.service';

@Injectable({providedIn: 'any'})
export class PowerBISandbox extends Sandbox {
    embedUrl :string;
    constructor(private powerBIApiClient: PowerBIApiClient
    ) {
        super();
        this.embedUrl = 'https://app.powerbi.com/reportEmbed';
    }

    public getAccessToken(tenantid): Observable<any> {
        return this.powerBIApiClient.getAccessToken(tenantid);
    }

    public getTanentId() {
        return this.powerBIApiClient.getTanentId();
    }
}
