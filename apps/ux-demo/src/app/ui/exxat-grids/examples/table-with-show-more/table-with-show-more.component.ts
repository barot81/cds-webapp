/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FullScreenService, HeaderService } from '@exxat/ux';
import { GridService } from '../../../../apps/student-grid/grid.service';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';

export interface PeriodicElement {
  id: any;
  name: string;
  position: number;
  note: string;
  symbol: string;
  address: string;
  phone: string;
  document: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: Math.random(),
    position: 1,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 2,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 3,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 4,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 5,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 6,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 7,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 8,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 9,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 10,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 11,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 12,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 13,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 14,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 15,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 16,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 17,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to , In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 18,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 19,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
  {
    id: Math.random(),
    position: 20,
    name: 'Anna Strong',
    address:
      '16633 Dallas Parkway , Suite 800, Addison, Dallas, Texas(TX) 75001',
    phone: '352-228-9130',
    document: 'Document name Name Lorem ipsum dolar sit amit 1',
    note: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    symbol: 'H',
  },
];

@Component({
  selector: 'table-with-show-more',
  templateUrl: './table-with-show-more.component.html',
  styleUrls: ['./table-with-show-more.component.scss'],
})
export class TableWithShowMoreComponent {
  searchItem = new FormControl();

  displayedColumns: string[] = [
    'position',
    'name',
    'address',
    'phone',
    'note',
    'document',
    'symbol',
  ];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();

  constructor(
    public _UXDemoDrawerService: UXDemoDrawerService,
    public _fullScreenService: FullScreenService,
    public headerService: HeaderService,
    public gridService: GridService,
    private elem: ElementRef
  ) {}

  //code for onclick single row select and outside table click event
  clicked = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#headerHoerGrid')
        .contains(event.target)
    ) {
      if (this.clickedRows.size) {
        this.highlightedRows = this.clickedRows;
      }
      this.clickedRows = new Set<PeriodicElement>();
    }
  }

  addRow(row) {
    if (this.clickedRows.size) {
      if (this.clickedRows.has(row)) {
        this.clickedRows = new Set<PeriodicElement>();
      } else {
        this.clickedRows = new Set<PeriodicElement>();
        this.clickedRows.add(row);
      }
    } else {
      this.clickedRows.add(row);
    }
    this.highlightedRows = new Set<PeriodicElement>();
  }
  //code for onclick single row select and outside table click event

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return elem.scrollHeight > 40; // 40 is the value of height of the 2 line text
    } else {
      return false;
    }
  }
}
