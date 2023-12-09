import { Injectable } from '@angular/core';
import { HttpService } from './../../asyncServices/http/http.service';
import { Observable } from 'rxjs';
import { GET, Path, Header } from '../../asyncServices/http/http.decorator';

@Injectable({providedIn: 'any'})
export class UserService extends HttpService {

    name: string;
    email: string;
    setUserName(userName:string, email: string) {
        this.name = userName;
        this.email = email;
        localStorage.setItem('userName', userName);
        localStorage.setItem('email', email);
    }

    getUserName(): string {
       if(!this.name) {
            this.name = localStorage.getItem('userName');
       }
       return this.name;
    }
    getEmail(): string {
      if(!this.email) {
        this.name = localStorage.getItem('email');
      }
      return this.email;
    }
    @GET<any>('/Profile/{userId}')
    UpdateUser(@Path('userId') userId:number,@Header('TenantId') header: string, @Header('Oucodes') oucodes: string): Observable<any> {
        return null;
    }
}
