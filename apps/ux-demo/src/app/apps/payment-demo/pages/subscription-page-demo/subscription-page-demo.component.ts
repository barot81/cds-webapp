import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  product: string;
  description: string;
  duration: string;
  total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { product: 'Approve', description: 'Approve service of Exxat', duration: 'Expired on Sep 23, 2020', total: '$ 50,000' },
  { product: 'Plan', description: 'Plan service of Exxat', duration: 'Expired on Sep 24, 2020', total: '$ 40,000' },
  { product: 'CCS', description: 'CCS service of Exxat', duration: 'Expired on Sep 27, 2020', total: '$ 70,000' }
];


@Component({
  selector: 'ryzen-subscription-page-demo',
  templateUrl: './subscription-page-demo.component.html',
  styleUrls: ['./subscription-page-demo.component.scss']
})
export class SubscriptionPageDemoComponent implements OnInit {

  displayedColumns: string[] = ['product', 'description', 'duration', 'total'];
  dataSource = ELEMENT_DATA;

  productList = [
    { title: 'STEPS', price: '$50', description: 'This is STEPS product of Exxat.', buttonTitle: 'Add to cart' },
    { title: 'Patient Log', price: '$70', description: 'This is patient log product of Exxat.', buttonTitle: 'Add to cart' },
    { title: 'Evaluation', price: '$80', description: 'This is evaluation product of Exxat.', buttonTitle: 'Add to cart' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
