import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionPageDemoComponent } from './pages/subscription-page-demo/subscription-page-demo.component';
import { CartPageDemoComponent } from './pages/cart-page-demo/cart-page-demo.component';
import { SuccessPageDemoComponent } from './pages/success-page-demo/success-page-demo.component';

const routes: Routes = [{
  path: 'subscription-demo',
  component: SubscriptionPageDemoComponent
},
{
  path: 'cart-demo',
  component: CartPageDemoComponent
},
{
  path: 'success-demo',
  component: SuccessPageDemoComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentDemoRoutingModule { }
