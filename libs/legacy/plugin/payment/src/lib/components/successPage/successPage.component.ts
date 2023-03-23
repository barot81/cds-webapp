import { Component } from "@angular/core";
import { CartSandbox } from '../../services/cart.sandbox';
import { PageFacade } from '@exxat/ux';

@Component({
    selector: 'success-page',
    templateUrl: './successPage.component.html',
    styleUrls: ['./../home.component.scss']
})
export class SuccessPageComponent {

    constructor(private cartSandbox: CartSandbox, private pageFacade: PageFacade) {
    }

    ngOnInit() {
        this.pageFacade.setPageTitleByNavigationId("payment.subscriptions");
        this.cartSandbox.clearCart().subscribe(res => {

        });
    }
}