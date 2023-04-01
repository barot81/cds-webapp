import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FullScreenService, HeaderService } from '@zhealthcare/ux';
import { MatTableDataSource } from '@angular/material/table';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../../../../apps/student-grid/grid.service';


export interface PeriodicElement {
  CIdetails: string;
  patientDetails: string;
  patientLog: number;
  SCCE: string;
  PTSE1: string;
  assesment: string;
  finalScore: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    patientDetails: '1',
    CIdetails: '70',
    patientLog: 1.0079,
    SCCE: 'H',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '2',
    CIdetails: '70',
    patientLog: 4.0026,
    SCCE: 'He',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '3',
    CIdetails: '70',
    patientLog: 6.941,
    SCCE: 'Li',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '4',
    CIdetails: '70',
    patientLog: 9.0122,
    SCCE: 'Be',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '5',
    CIdetails: '70',
    patientLog: 10.811,
    SCCE: 'B',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '6',
    CIdetails: '70',
    patientLog: 12.0107,
    SCCE: 'C',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '3',
    CIdetails: '70',
    patientLog: 6.941,
    SCCE: 'Li',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '4',
    CIdetails: '70',
    patientLog: 9.0122,
    SCCE: 'Be',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '5',
    CIdetails: '70',
    patientLog: 10.811,
    SCCE: 'B',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '6',
    CIdetails: '70',
    patientLog: 12.0107,
    SCCE: 'C',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '3',
    CIdetails: '70',
    patientLog: 6.941,
    SCCE: 'Li',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '4',
    CIdetails: '70',
    patientLog: 9.0122,
    SCCE: 'Be',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '5',
    CIdetails: '70',
    patientLog: 10.811,
    SCCE: 'B',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '6',
    CIdetails: '70',
    patientLog: 12.0107,
    SCCE: 'C',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '3',
    CIdetails: '70',
    patientLog: 6.941,
    SCCE: 'Li',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '4',
    CIdetails: '70',
    patientLog: 9.0122,
    SCCE: 'Be',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '5',
    CIdetails: '70',
    patientLog: 10.811,
    SCCE: 'B',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
  {
    patientDetails: '6',
    CIdetails: '70',
    patientLog: 12.0107,
    SCCE: 'C',
    PTSE1: 'example',
    assesment: 'example',
    finalScore: 17,
    action: 'edit',
  },
];

@Component({
  selector: 'ryzen-grid-with-two-header-rows',
  templateUrl: './grid-with-two-header-rows.component.html',
  styleUrls: ['./grid-with-two-header-rows.component.scss'],
})
export class GridWithTwoHeaderRowsComponent implements OnInit {
  searchItem = new FormControl();
  @ViewChild('gray_header') $gray_header: ElementRef;
  @ViewChild('search_bar_filter_container')
  $search_bar_filter_container: ElementRef;

  fixedSettledHeight: number = 135;
  fullScreenMode: boolean = false;
  @ViewChild('header') elementView: ElementRef;

  clickedRows = new Set<PeriodicElement>();
  highlightedRows = new Set<PeriodicElement>();
  displayedColumns: string[] = [
    'patientDetails',
    'CIdetails',
    'patientLog',
    'SCCE',
    'PTSE1',
    'assesment',
    'finalScore',
    'action',
  ];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  tooltipOptions = {
    contentType: 'string',
    placement: 'right',
    trigger: 'hover',
    'max-width': '450',
    width: '450',
    pointerEvents: 'auto',
  };

  constructor(
    public headerService: HeaderService,
    public _fullScreenService: FullScreenService,
    public gridService: GridService,
    private elem: ElementRef,
    public _UXDemoDrawerService: UXDemoDrawerService
  ) {}

  //code for onclick single row select and outside table click event
  clicked: string = '';
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (
      !this.elem.nativeElement
        .querySelector('#multi-header-grid')
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

  ngAfterViewInit() {
    this.setGridHeight();
    setTimeout(() => {
      let gray_header_height = this.$gray_header.nativeElement.offsetHeight;
      let search_bar_filter_container =
        this.$search_bar_filter_container.nativeElement.offsetHeight;
      this.headerService.setCurrentHeaderHeight(
        gray_header_height + search_bar_filter_container
      );
    });
  }

  ngOnInit() {}

  //#endregion
  setGridHeight(): void {
    setTimeout(() => {
      let height =
        this.elementView.nativeElement.offsetHeight + this.fixedSettledHeight;
      this.headerService.setCurrentHeaderHeight(height);
    });
  }

  // toggleFullScreenMode() {
  //   this.fullScreenMode = !this.fullScreenMode;
  //   var el = document.documentElement;
  //   if (this.fullScreenMode) {
  //     setTimeout(() => {
  //       el.requestFullscreen();
  //       this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
  //     });
  //   }
  //   else {
  //     document.exitFullscreen();
  //     this.setGridHeight();
  //   }
  //   this._fullScreenService.setFullScreenModeEnabled(this.fullScreenMode);
  // }
}
