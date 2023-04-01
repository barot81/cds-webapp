import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-category1-page-demo',
  templateUrl: './category1-page-demo.component.html',
  styleUrls: ['./category1-page-demo.component.scss']
})
export class Category1PageDemoComponent implements OnInit {

  public type: string = 'component';
  chipList: string[] = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  


  constructor() { }

  ngOnInit() {
  }

}
