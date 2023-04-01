import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  product: string;
  description: string;
  duration: string;
  total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { product: 'Approve', description: 'Approve service of zhealthcare', duration: 'Expired on Sep 23, 2020', total: '$ 50,000' },
  { product: 'Plan', description: 'Plan service of zhealthcare', duration: 'Expired on Sep 24, 2020', total: '$ 40,000' },
  { product: 'CCS', description: 'CCS service of zhealthcare', duration: 'Expired on Sep 27, 2020', total: '$ 70,000' }
];


@Component({
  selector: 'ryzen-cart-page-demo',
  templateUrl: './cart-page-demo.component.html',
  styleUrls: ['./cart-page-demo.component.scss']
})
export class CartPageDemoComponent implements OnInit {

  duration = new FormControl();

  durationList: [{ value: '6 months $50' }, { value: '12 months $100' }, { value: '18 months $150' }];

  displayedColumns: string[] = ['product', 'description', 'duration', 'total', 'action'];
  dataSource = ELEMENT_DATA;


  constructor() { }

  ngOnInit() {
  }

}
