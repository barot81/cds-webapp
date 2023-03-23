import { Component, ChangeDetectorRef } from '@angular/core';
import { ResourceSandbox } from '../services/resource.sandbox';
import { CartSandbox } from '../services/cart.sandbox';
import { Dictionary } from 'linq-collections';
import { Router } from '@angular/router';
import { BaseComponent, MetaConstants } from '@zhealthcare/fusion/core';
import { Resource } from '../models/resource';
import { ActiveSubscription } from '../models/subscription';
import { FuseProgressBarService } from '@zhealthcare/ux';
import { PageFacade } from '@zhealthcare/ux';

export interface PeriodicElement {
  product: string;
  description: string;
  duration: string;
  total: string;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class PaymentHomeComponent extends BaseComponent {
  resources: Resource[];
  activeSubscriptions: ActiveSubscription[] = [];
  selectedSubscriptionId: string;
  selectedSubscriptions: Dictionary<string, string>;
  IsItemAddedInCart: Map<string, boolean>;
  loading: boolean = true;
  cartItemCount: number;
  viewingAsStudent: boolean = false;

  displayedColumns: string[] = ['product', 'description', 'expiry', 'total'];

  constructor(
    private _fuseProgressBarService: FuseProgressBarService,
    private pageFacade: PageFacade,
    private resourceSandbox: ResourceSandbox,
    private router: Router,
    private cartSandbox: CartSandbox
  ) {
    super();
    this.selectedSubscriptions = new Dictionary<string, string>();
    this.IsItemAddedInCart = new Map<string, boolean>();
  }
  ngOnInit() {
    this.pageFacade.setPageTitleByNavigationId('payment.subscriptions');

    var managedUserAccount = JSON.parse(
      sessionStorage.getItem(MetaConstants.USER_LOCAL_STORAGE_KEY)
    )?.ManagedUserAccount;
    if (!managedUserAccount)
      managedUserAccount = JSON.parse(
        localStorage.getItem(MetaConstants.USER_LOCAL_STORAGE_KEY)
      )?.ManagedUserAccount;

    if (managedUserAccount && managedUserAccount?.IsActive) {
      //Get Student Subscriptions when viewing as student
      this.getStudentActiveSubscriptions(
        managedUserAccount.Id,
        managedUserAccount.CohortId
      );
      this.viewingAsStudent = true;
    } else {
      this.getCartItems();
      this.getActiveSubscriptions();
      this.viewingAsStudent = false;
    }
    this.showProgessBar();
  }

  getResources() {
    this.resourceSandbox.getResources().subscribe((resp) => {
      resp?.forEach((resource) => {
        this.selectedSubscriptions.setOrUpdate(
          resource.resourceId,
          resource.subscriptions[0].subscriptionId
        );
      });

      this.resources = resp;
      this.activeSubscriptions.forEach((subscription) => {
        const index = this.resources.findIndex(
          (x) => x.resourceId == subscription.resourceId
        );
        if (index > -1) {
          this.resources.splice(index, 1);
        }
      });
      this.hideProgessBar();
    });
  }

  getActiveSubscriptions() {
    this.resourceSandbox.getActiveSubscriptions().subscribe((resp) => {
      this.activeSubscriptions = resp;
      this.loading = false;
      this.getResources();
    });
  }

  getStudentActiveSubscriptions(studentId: string, cohortId: string) {
    this.resourceSandbox
      .getStudentActiveSubscriptions(studentId.toString(), cohortId)
      .subscribe((resp) => {
        this.activeSubscriptions = resp;
        this.loading = false;
        this.hideProgessBar();
      });
  }

  addToCart(resourceId: string) {
    this.showProgessBar();
    let subscriptionId = this.selectedSubscriptions.get(resourceId);
    this.cartSandbox.addToCart(resourceId, subscriptionId).subscribe((resp) => {
      if (resp?.toString() == '1') {
        this.cartItemCount += 1;
        this.IsItemAddedInCart.set(resourceId, true);
      }
      this.hideProgessBar();
    });
  }

  removeCartItem(resourceId: string) {
    this.showProgessBar();
    this.cartSandbox.removeCartItem(resourceId).subscribe((resp) => {
      if (resp == '1') this.cartItemCount -= 1;
      this.hideProgessBar();
    });
  }

  getCartItems() {
    this.cartSandbox.getCartItems().subscribe((resp) => {
      this.cartItemCount = 0;
      resp?.forEach((item) => {
        this.IsItemAddedInCart.set(item.resourceId, true);
        this.cartItemCount += 1;
      });
    });
  }

  onSubscriptionChanged($event, resourceId) {
    this.selectedSubscriptions.setOrUpdate(resourceId, $event.target.value);
  }
  checkout() {
    this.router.navigate(['/payment/cart']);
  }
  showProgessBar() {
    this._fuseProgressBarService.show();
  }
  hideProgessBar() {
    this._fuseProgressBarService.hide();
  }
}
