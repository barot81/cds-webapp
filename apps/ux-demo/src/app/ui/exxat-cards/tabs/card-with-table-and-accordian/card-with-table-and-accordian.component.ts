import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    date: string;
    document: string;
    notes: string;
    cohort: string;
    status: string;
    actions: string;
    statusClass: string;
    link:string;
    class:string;
    
  }
  const ELEMENT_DATA: PeriodicElement[] = [
    {
      date: 'Apr 12, 2022',
      document: 'Document name Name Lorem ipsum dolar sit amit 1',
      link:'View Document',
      class:'fa-circle-check green-fg',
      notes: 'I am interested in expandinexperiences while improving my clinical skills in an outpatient neurologic setting. I will be an asset due to my clinical experience among patients with neurologic disorders and my',
      cohort: 'Cohort XYZ',
      status: 'Active',
      actions: '',
      statusClass: 'approved',
    },
    {
      date: 'Apr 12, 2022',
      document: 'Document name Name Lorem ipsum dolar sit amit 1',
      link:'',
      class:'fa-circle-xmark warn-fg',
       notes: 'I am interested in expandinexperiences while improving my clinical skills in an outpatient neurologic setting. I will be an asset due to my clinical experience among patients with neurologic disorders and my',
      cohort: 'Cohort XYZ',
      status: 'In-Active',
      actions: '',
      statusClass: 'disapproved',
    },
    {
      date: 'Apr 12, 2022',
      document: 'Document name Name Lorem ipsum dolar sit amit 1',
      link:'View Document',
      class:'fa-circle-check green-fg',
       notes: 'Description: about the document. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      cohort: 'Cohort XYZ',
      status: 'Active',
      actions: '',
      statusClass: 'approved',
    },
    {
      date: 'Apr 12, 2022',
      document: 'Document name Name Lorem ipsum dolar sit amit 1',
      link:'',
      class:'fa-circle-xmark warn-fg',
       notes: 'Description: about the document. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      cohort: 'Cohort XYZ',
      status: 'Active',
      actions: '',
      statusClass: 'approved',
    },
    {
      date: 'Apr 12, 2022',
      document: 'Document name Name Lorem ipsum dolar sit amit 1',
      link:'View Document',
      class:'fa-circle-check green-fg',
       notes: 'Description: about the document. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
      cohort: 'Cohort XYZ',
      status: 'In-Active',
      actions: '',
      statusClass: 'disapproved',
    }
  ];

  
  export interface TablePeriodicElement {
    name: string;
    designation: string;
    status: string;
    email: string;
    phone: string;
    supervision: string;
  }
  const TABLE_ELEMENT_DATA: TablePeriodicElement[] = [
    {
      name: 'Aguilar, Alice',
      designation: 'Administrative Assistant',
      status: 'Student CI',
      email: 'carlpadilla@example.com',
      phone: '(239) 555-0108',
      supervision: 'XX%',
    },
    {
      name: 'Aguilar, Alice',
      designation: 'Administrative Assistant',
      status: 'Student CI',
      email: 'carlpadilla@example.com',
      phone: '(239) 555-0108',
      supervision: 'XX%',
    },
    {
      name: 'Aguilar, Alice',
      designation: 'Administrative Assistant',
      status: 'Student CI',
      email: 'carlpadilla@example.com',
      phone: '(239) 555-0108',
      supervision: 'XX%',
    },
    {
      name: 'Aguilar, Alice',
      designation: 'Administrative Assistant',
      status: 'Student CI',
      email: 'carlpadilla@example.com',
      phone: '(239) 555-0108',
      supervision: 'XX%',
    },
  ];


@Component({
  selector: 'card-with-table-and-accordian',
  templateUrl: './card-with-table-and-accordian.component.html',
  styleUrls: ['./card-with-table-and-accordian.component.scss']
})
export class CardWithTableAndAccordianComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'document',
        'sharedStudent',
        'notes',
        'actions',
      ];

      tableDisplayedColumns: string[] = [
        'name',
        'designation',
        'status',
        'email',
        'phone',
        'supervision'
      ];
      dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      tableDataSource = new MatTableDataSource<TablePeriodicElement>(TABLE_ELEMENT_DATA);

      isTextOverflow(text_id: string): boolean {
        const elem = document.getElementById(text_id);
        if (elem) {
          return (elem.scrollHeight > 40); // 40 is the value of height of the 2 line text
        }
        else {
          return false;
        }
      }
      
  constructor(
 // public gridService: GridService, (not in use)   
  ) { }

  ngOnInit() {
  }

}
