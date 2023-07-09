import { Injectable } from '@angular/core';
import { HttpService } from './../../asyncServices/http/http.service';
import { Observable } from 'rxjs';
import { GET, Path, Header } from '../../asyncServices/http/http.decorator';

@Injectable({providedIn: 'any'})
export class UserService extends HttpService {

    userName: string;
    setUserName(userName:string) {
        this.userName = userName;
        localStorage.setItem('userName', userName);
    }

    getUserName(): string {
       if(!this.userName) {
            this.userName = localStorage.getItem('userName');
       }
       return this.userName;
    }
    @GET<any>('/Profile/{userId}')
    UpdateUser(@Path('userId') userId:number,@Header('TenantId') header: string, @Header('Oucodes') oucodes: string): Observable<any> {
        return null;
    }
}
