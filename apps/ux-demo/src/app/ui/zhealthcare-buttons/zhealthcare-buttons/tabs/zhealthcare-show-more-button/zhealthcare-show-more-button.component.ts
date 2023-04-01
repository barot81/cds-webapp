import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];


@Component({
  selector: 'ryzen-zhealthcare-show-more-button',
  templateUrl: './zhealthcare-show-more-button.component.html',
  styleUrls: ['./zhealthcare-show-more-button.component.scss']
})
export class zhealthcareShowMoreButtonComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return (elem.scrollHeight > 40); // 40 is the value of height of the 2 line text
    }
    else {
      return false;
    }
  }

  workexperiences = [{ schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" },
  { schoolName: "San Diego State University", city: "Masters, Kinesology", time: "July 2014 - July 2016" }
  ];


  constructor(
    // public gridService: GridService
    //not found any use
    ) { }

  ngOnInit() {
  }

}
