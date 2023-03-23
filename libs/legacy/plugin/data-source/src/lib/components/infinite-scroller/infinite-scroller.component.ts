import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { DataSourceFacade } from '../../store/facades/index';

@Component({
  selector: 'exxat-infinite-scroller',
  templateUrl: './infinite-scroller.component.html',
  styleUrls: ['./infinite-scroller.component.scss'],
})
export class InfiniteScrollerComponent implements OnInit {
  @Output() scrollPosition = new EventEmitter();

  constructor(
    public element: ElementRef,
    public datasourceFacade: DataSourceFacade
  ) {
    console.log('called');
  }

  onScroll(event) {
    try {
      const top = event.target.scrollTop;
      const height = this.element.nativeElement.firstElementChild.scrollHeight;
      const offset = this.element.nativeElement.firstElementChild.offsetHeight;

      if (top > height - offset - 1) {
        //this.scrollPosition.emit('end');
        this.datasourceFacade.isAllDataLoaded$
          .subscribe((isLoaded) => {
            if (!isLoaded) this.datasourceFacade.LoadNextBatchOfData();
          })
          .unsubscribe();
      }

      // if (top === 0) {
      //   // this.scrollPosition.emit('top');
      // }
    } catch (err) {}
  }

  ngOnInit() {}
}
