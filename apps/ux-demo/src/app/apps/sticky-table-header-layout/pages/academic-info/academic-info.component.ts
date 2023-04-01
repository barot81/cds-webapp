/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';
interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  email: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    email: 'anna.strong@gmail.com',
    status: 'Active'
  }
];

@Component({
  selector: 'academic-info',
  templateUrl: './academic-info.component.html'
})
export class AcademicInfoComponent {
  searchItem = new FormControl();

  displayedColumns = [
    'position',
    'name',
    'weight',
    'symbol',
    'email',
    'status'
  ];
  dataSource = ELEMENT_DATA;

  constructor(private _UXDemoDrawerService: UXDemoDrawerService) {}

  //chips code
  fruits: string[] = [
    'Internal Medicine',
    'Family Medicine',
    'Sports Medicine'
  ];
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  //chips code end
}
