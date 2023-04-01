import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ryzen-address-info-drawer',
  templateUrl: './address-info-drawer.component.html',
})
export class AddressInfoDrawerComponent implements OnInit {



  addressList = [
    { value: "address 1", viewValue: "Address 1" },
    { value: "address 2", viewValue: "Address 2" },
    { value: "address 3", viewValue: "Address 3" }
  ];

  stateList = [
    { value: "state 1", viewValue: "state 1" },
    { value: "state 2", viewValue: "state 2" },
    { value: "state 3", viewValue: "state 3" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
