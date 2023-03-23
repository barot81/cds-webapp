import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET, HttpService, POST, Body, DELETE } from '@exxat/fusion/core';
import { CartViewModel, PaymentSecurityContext } from './../models';

@Injectable({providedIn: 'any'})
export class CartApiClient extends HttpService {
    config;

    constructor() {
        super();
        this.config = this.configService.getservice('payment').endpoint;
    }

    getBaseUrl(): string {
        return this.config;
    }

    @GET<any[]>('/Cart')
    public getCartItems(): Observable<any> {
        return null;
    }

    @POST<any>('/Cart/AddToCart', null)
    public addToCart(@Body body: CartViewModel): Observable<any> {
        return null;
    }

    @POST<any>('/Cart/RemoveFromCart', null)
    public removeCartItem(@Body viewModel: CartViewModel): Observable<any> {
        return null;
    }

    @DELETE<any>('/Cart/ClearCart')
    public clearCart(): Observable<any> {
        return null;
    }

    @POST<any>('/Request/GetToken', PaymentSecurityContext)
    public getToken(@Body Body: any): Observable<any> {
        return null;
    }

}
