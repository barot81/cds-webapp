import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss']
})
export class ShowMoreComponent implements AfterViewInit, OnChanges {

  @Input('height') Height: number;

  allowedHeight: number = 45;

  isCollapsed = new BehaviorSubject<boolean>(false);
  $isCollapsed = this.isCollapsed.asObservable();
  showButtons = new BehaviorSubject<boolean>(false);
  $showButtons = this.showButtons.asObservable();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Height) {
      this.setProperties();
    }
  }

  ngAfterViewInit(): void {
    this.setProperties();
  }

  setProperties(): void {

    setTimeout(() => {

      this.Height <= this.allowedHeight ? this.showButtons.next(false) : this.showButtons.next(true);

      this.Height > this.allowedHeight ? this.isCollapsed.next(true) : this.isCollapsed.next(false);
    });


  }

  toggleIsCollapsed() {
    this.isCollapsed.next(!this.isCollapsed.value);
  }

}
