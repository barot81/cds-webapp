import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'add-form-drawer',
  templateUrl: './add-form-drawer.component.html',
  styleUrls: ['./add-form-drawer.component.scss']
})
export class AddFormDrawerComponent implements OnInit {

  status = new FormControl();
  
    valueList = [
        { value: "value 1", viewValue: "value 1" },
        { value: "value 2", viewValue: "value 2" }
      ];


  statusList: string[] = ['Get Started', 'In Progress', 'Expired'];
  constructor( ) { }

  ngOnInit() {
  }

}
