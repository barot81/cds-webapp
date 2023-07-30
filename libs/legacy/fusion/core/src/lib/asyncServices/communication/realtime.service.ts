import { EventEmitter, Injectable } from '@angular/core';
// import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { FusionConfigService } from './../../configuration/index';

@Injectable({providedIn: 'any'})
export class RealtimeService {
    messageReceived = new EventEmitter<any>();
    connectionEstablished = new EventEmitter<boolean>();
    BASE_URL = ""
    // private _hubConnection: HubConnection;

    constructor(private readonly configService : FusionConfigService){
        this.BASE_URL = this.configService.appSettings.realtime.endpoint;
    }

    start(groupName: string) {
        this.createConnection(groupName);
        this.registerOnServerEvents();
        this.startConnection();
    }
    private createConnection(groupName: string) {
        const tenant = localStorage.getItem("TenantId");
        if (groupName != null && tenant != null) {
            // this._hubConnection = new HubConnectionBuilder()
            //     .withUrl(`${this.BASE_URL}?groupName=${groupName}&TenantId=${tenant}`)
            //     .build();
        }
    }
    private startConnection(): void {
        // this._hubConnection
        //     .start()
        //     .then(() => {
        //         console.log('Hub connection started');
        //         this.connectionEstablished.emit(true);
        //     })
        //     .catch(err => {
        //         console.log('Error while establishing connection, retrying...');
        //         setTimeout(() => {
        //             this.startConnection();
        //         }, 10000);
        //     });
    }
    private registerOnServerEvents(): void {
        // this._hubConnection.on('ReceiveMessage', (data: any) => {
        //     this.messageReceived.emit(data);
        // });
    }
}
