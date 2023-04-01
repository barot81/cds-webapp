
import { AfterViewInit, Component,ElementRef, ViewChild  } from '@angular/core';
import { FuseSidebarService,ScrollSpyService } from '@exxat/ux';
import { MatDialog } from '@angular/material/dialog';

//#endregion
@Component({
  selector: 'ryzen-frequency-based-eval-form',
  templateUrl: './frequency-based-eval-form.component.html',
  styleUrls: ['./frequency-based-eval-form.component.scss']
})
export class FrequencyBasedEvalFormComponent {
  @ViewChild('scrollSpyHeader') scrollSpyHeader: ElementRef;
  public scrollSpyHeaderHeight: number;
  constructor(public dialog: MatDialog,private _fuseSidebarService: FuseSidebarService,public _scrollSpyService: ScrollSpyService) {
 
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollSpyHeaderHeight = (this.scrollSpyHeader.nativeElement.offsetHeight) + 80;
    });
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}

