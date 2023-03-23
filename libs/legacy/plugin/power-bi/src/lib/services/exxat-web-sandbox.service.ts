import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Sandbox } from '@exxat/fusion/core';
import { PowerBIApiClient } from './exxat-web-api-client.service';

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
