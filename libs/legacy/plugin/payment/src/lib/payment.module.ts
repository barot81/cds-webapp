import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule, UxModule } from '@exxat/ux';
import { AuthGuardService } from '@exxat/fusion/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentHomeComponent } from './components/home.component';
import {
  CartSandbox,
  ResourceSandbox,
  CartApiClient,
  ResourceApiClient,
} from './services';
import { CartComponent } from './components/cart/cart.component';
import { SuccessPageComponent } from './components/successPage/successPage.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: 'subscriptions',
    component: PaymentHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'success',
    component: SuccessPageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    UxModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [PaymentHomeComponent, CartComponent, SuccessPageComponent],
  providers: [CartSandbox, ResourceSandbox, ResourceApiClient, CartApiClient],
})
export class PaymentModule {}
