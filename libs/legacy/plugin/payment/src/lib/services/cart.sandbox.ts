import { Injectable } from '@angular/core';
import { Sandbox } from '@zhealthcare/fusion/core';
import { Observable } from 'rxjs';
import { CartApiClient } from './cart.ApiClient';
import { CartViewModel } from './../models';
@Injectable({providedIn: 'any'})
export class CartSandbox extends Sandbox {

    constructor(private cartApiClient: CartApiClient) {
        super();
    }

    public getCartItems(): Observable<any[]> {
        return this.cartApiClient.getCartItems();
    }

    public addToCart(resourceId: string, subscriptionId: string): Observable<any[]> {
        let viewModel: CartViewModel = { ResourceId: resourceId, SubscriptionId: subscriptionId };
        return this.cartApiClient.addToCart(viewModel);
    }

    public removeCartItem(resourceId: string): Observable<any> {
        let viewModel: CartViewModel = { ResourceId: resourceId };
        return this.cartApiClient.removeCartItem(viewModel);
    }

    public clearCart(): Observable<any> {
        return this.cartApiClient.clearCart();
    }

    public getToken() {
        return this.cartApiClient.getToken("");
    }

}
