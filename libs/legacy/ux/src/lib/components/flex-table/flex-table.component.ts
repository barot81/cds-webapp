import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, Input } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { FlexTableService } from './flex-table.service';

@Component({
  selector: 'flex-table',
  templateUrl: './flex-table.component.html',
  styleUrls: ['./flex-table.component.scss']
})
export class FlexTableComponent implements AfterViewInit {

  leftInterval: any;

  rightInterval: any;

  private button_visibillity = new BehaviorSubject<boolean>(false);
  public $button_visibility = this.button_visibillity.asObservable();

  private left_scroll_poistion = new BehaviorSubject<number>(0);
  public $left_scroll_position = this.left_scroll_poistion.asObservable();

  private right_scroll_visibility = new BehaviorSubject<boolean>(true);
  public $right_scroll_visibility = this.right_scroll_visibility.asObservable();

  @ViewChild('flex_table_content', { static: false }) flex_table_content: ElementRef;

  public table_content: Element;
  public sticky_table_contect: Element;
  public center_content: Element;

  @Input('scroll_value') scroll_value = 100;

  constructor(private renderer: Renderer2, private _FlexTableService: FlexTableService) {
  }

  ngAfterViewInit() {

    this.initScroll();

    fromEvent(this.table_content, 'scroll').subscribe((e: any) => {
      this.left_scroll_poistion.next(Math.round(this.table_content.scrollLeft));

      this.set_Right_Scroll_Button_Visibility();
    }
    );

    this._FlexTableService.AccessChangeDetection.subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.initScroll();
          this.set_Right_Scroll_Button_Visibility();
        });
      }
    });

  }

  initScroll() {
    this.table_content = this.flex_table_content.nativeElement.querySelector('.flex_table_content');

    this.center_content = this.flex_table_content.nativeElement.closest('.center');

    this.renderer.setStyle(this.table_content, 'scroll-behavior', 'smooth');
    setTimeout(() => {
      this.setButtonVisibility();
    });
  }

  scrollLeft() {
    this.leftInterval = setInterval(() => {
      clearInterval(this.rightInterval);
      if (Math.round(this.table_content.scrollLeft) != 0) {
        this.scrollToleft()
      }
      else {
        clearInterval(this.leftInterval);
        this.left_scroll_poistion.next(Math.round(this.table_content.scrollLeft));
      }
    }, 250);

  }

  scrollRight() {
    this.rightInterval = setInterval(() => {
      clearInterval(this.leftInterval);
      if (this.table_content.scrollWidth - this.table_content.clientWidth !== Math.round(this.table_content.scrollLeft)) {
        this.scrollToRight();
      }
      else {
        clearInterval(this.rightInterval);
        this.right_scroll_visibility.next(false);
      }
    }, 250);
  }

  setButtonVisibility() {
    if (this.table_content?.scrollWidth >= this.center_content?.scrollWidth) {
      // console.log('Center Width : ', this.center_content.scrollWidth);
      // console.log('Table Width : ', this.table_content.scrollWidth);
      
      this.button_visibillity.next(true);
    }
    else{
      this.button_visibillity.next(false);
    }
  }

  leaveScrollLeft() {
    clearInterval(this.leftInterval);
  }

  leaveScrollRight() {
    clearInterval(this.rightInterval);
  }

  scrollToleft() {
    this.table_content.scrollLeft -= this.scroll_value;
    this.left_scroll_poistion.next(Math.round(this.table_content.scrollLeft));
    this.set_Right_Scroll_Button_Visibility();
  }

  scrollToRight() {
    this.table_content.scrollLeft += this.scroll_value;
    this.left_scroll_poistion.next(Math.round(this.table_content.scrollLeft));
  }

  set_Right_Scroll_Button_Visibility() {
    if (this.table_content.scrollWidth - this.table_content.clientWidth !== Math.round(this.table_content.scrollLeft)) {
      this.right_scroll_visibility.next(true);
    }
    else {
      this.right_scroll_visibility.next(false);
    }
  }
}
