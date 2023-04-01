import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDemoRoutingModule } from './payment-demo-routing.module';
import { SubscriptionPageDemoComponent } from './pages/subscription-page-demo/subscription-page-demo.component';
import { CartPageDemoComponent } from './pages/cart-page-demo/cart-page-demo.component';
import { SuccessPageDemoComponent } from './pages/success-page-demo/success-page-demo.component';
import { MaterialModule, FuseSharedModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SubscriptionPageDemoComponent, CartPageDemoComponent, SuccessPageDemoComponent],
  imports: [
    CommonModule,
    PaymentDemoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule
  ]
})
export class PaymentDemoModule { }
