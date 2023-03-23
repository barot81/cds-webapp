import { Component } from '@angular/core';
import { CartSandbox } from '../../services/cart.sandbox';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@zhealthcare/ux';
import { PageFacade } from '@zhealthcare/ux';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    cartItems: any[] = [];
    totalPrice: number;
    displayedColumns: string[] = ['product', 'description', 'duration', 'price', 'action'];
    loading: boolean = true;
    constructor(private cartSandbox: CartSandbox, private pageFacade: PageFacade,private _fuseProgressBarService: FuseProgressBarService, private router: Router) {
    }

    ngOnInit() {
        this.pageFacade.setPageTitle("Cart");
        this.showProgessBar();
        this.getCartItems();
    }

    getCartItems() {
        this.cartSandbox.getCartItems().subscribe(resp => {
            if (resp != null) {
                this.cartItems = resp;
                this.calculateTotal();
            }
            else {
                this.cartItems = [];
            }
            this.loading = false;
            this.hideProgessBar();
        });
    }
    calculateTotal() {
        this.totalPrice = 0;
        this.cartItems.forEach(item => {
            this.totalPrice = this.totalPrice + item.subscription.price
        });
    }
    pay() {
        this.showProgessBar();
        this.cartSandbox.getToken().subscribe(resp => {
            if (resp.token != null && resp.responseCode == "Ok")
                this.RedirectToPaymentPage(resp);
        });
    }

    removeCartItem(resourceId: string, item: any) {
        this.showProgessBar();
        this.cartSandbox.removeCartItem(resourceId).subscribe(resp => {
            if (resp == "1") {
                this.getCartItems();
            }
        });
    }

    back() {
        this.router.navigate(['/payment/subscriptions']);
    }

    RedirectToPaymentPage(response: any) {
        var mapForm = document.createElement("form");
        mapForm.method = "POST";
        mapForm.action = response.redirectUrl;

        var mapInput = document.createElement("input");
        mapInput.type = "hidden";
        mapInput.name = "token";
        mapInput.setAttribute("value", response.token);
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    }
    showProgessBar() {
        this._fuseProgressBarService.show();
    }
    hideProgessBar() {
        this._fuseProgressBarService.hide();
    }
}
