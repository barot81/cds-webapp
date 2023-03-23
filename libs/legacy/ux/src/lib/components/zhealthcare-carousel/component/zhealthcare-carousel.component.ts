import {
    AfterViewInit,
    EventEmitter,
    Component,
    ElementRef,
    Input,
    Output,
    ViewChild,
    HostListener
  } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';

  export class CarouselEvent {
    type: 'Left' | 'Right';
    currentStep: number;
    previousStep: number;
  }

  @Component({
    selector: 'zhealthcare-carousel',
    templateUrl: './zhealthcare-carousel.component.html',
    styleUrls: ['./zhealthcare-carousel.component.scss']
  })
  export class zhealthcareCarouselComponent implements AfterViewInit {
    @ViewChild('zhealthcare_carousel_content', { static: false })
    zhealthcare_carousel_content: ElementRef;

    @ViewChild('zhealthcare_carousel_container', { static: false })
    zhealthcare_carousel_container: ElementRef;

    private buttons_visibillity = new BehaviorSubject<boolean>(false);
    public $buttons_visibility = this.buttons_visibillity.asObservable();

    public left_scroll_poistion = new BehaviorSubject<number>(0);
    public $left_scroll_position = this.left_scroll_poistion.asObservable();

    public right_scroll_visibility = new BehaviorSubject<boolean>(true);
    public $right_scroll_visibility = this.right_scroll_visibility.asObservable();

    public scrolling = new BehaviorSubject<boolean>(false);
    public scrolling$ = this.scrolling.asObservable();

    @Input() currentStep: number = 0;
    @Input() maxItems: number;

    @Input('width') width: number;

    @Output() OnChange = new EventEmitter<CarouselEvent>();
    /**
     *
     */
    constructor() {}

    @HostListener('wheel', ['$event'])
    handleWheelEvent(event) {
      event.preventDefault();
    }

    ngOnInit(): void {
      if (this.currentStep > 0)
        this.left_scroll_poistion.next(this.currentStep * this.width);
      if (this.maxItems && this.maxItems != null) {
        if (this.currentStep && this.currentStep !== null) {
          if (this.currentStep === this.maxItems - 1) {
            this.right_scroll_visibility.next(false);
          } else if (this.currentStep >= this.maxItems) {
            this.right_scroll_visibility.next(false);
          }
        }
      }
    }

    ngAfterViewInit(): void {
      this.zhealthcare_carousel_content.nativeElement.scrollLeft =
        this.currentStep * this.width;
      setTimeout(() => {
        this.setButtonVisibility();
      });
    }

    private setButtonVisibility() {
      if (
        this.zhealthcare_carousel_content.nativeElement.clientWidth <
        this.zhealthcare_carousel_content.nativeElement.scrollWidth
      ) {
        this.buttons_visibillity.next(true);
      } else {
        this.buttons_visibillity.next(false);
      }
    }

    async scrollToDirection(direction: string) {
      if (!this.scrolling.value) {
        this.scrolling.next(true);

        const currentScrollLeft = this.zhealthcare_carousel_content.nativeElement
          .scrollLeft;

        let changeValue;
        let event = new CarouselEvent();
        event.previousStep = this.currentStep;

        if (direction.trim().toLowerCase() === 'left') {
          changeValue = currentScrollLeft - this.width;
          this.zhealthcare_carousel_content.nativeElement.scrollLeft = changeValue;
          event.type = 'Left';
          if (this.currentStep > 0) {
            this.currentStep--;
          } else {
            this.currentStep = 0;
          }
          event.currentStep = JSON.parse(JSON.stringify(this.currentStep));
          this.OnChange.emit(event);
        } else {
          changeValue = currentScrollLeft + this.width;
          this.zhealthcare_carousel_content.nativeElement.scrollLeft = changeValue;
          event.type = 'Right';
          this.currentStep++;
          event.currentStep = JSON.parse(JSON.stringify(this.currentStep));
          this.OnChange.emit(event);
        }

        this.left_scroll_poistion.next(Math.round(changeValue));

        await this.set_Right_Scroll_Button_Visibility(changeValue);

        // Prvent Scrolling Until Current Scroll Event Complete
        setTimeout(() => {
          if (this.scrolling.value) {
            this.scrolling.next(false);
          }
        }, 1000);
      }
    }

    async set_Right_Scroll_Button_Visibility(changeValue: number) {
      if (
        this.zhealthcare_carousel_content.nativeElement.scrollWidth -
          this.zhealthcare_carousel_content.nativeElement.clientWidth >=
        Math.round(changeValue) + 16
      ) {
        this.right_scroll_visibility.next(true);
      } else {
        this.right_scroll_visibility.next(false);
      }
    }
  }

