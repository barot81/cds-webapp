import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'exxat-avatar-list-item',
  templateUrl: './exxat-avatar-list-item.component.html',
  styleUrls: ['./exxat-avatar-list-item.component.scss']
})
export class ExxatAvatarListItemComponent implements OnInit, OnChanges {
  @Input() src: string;
  @Input() firstName: string = '';
  @Input() lastName: string = '';

  firstInitial: string;
  lastInitial: string;

  constructor() {}

  ngOnInit() {
    this.setIntitals(this.firstName, this.lastName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setIntitals(
      changes.firstName.currentValue,
      changes.lastName.currentValue
    );
  }

  setIntitals(firstInitial: string, lastInitial: string) {
    if (firstInitial) {
      this.firstInitial = firstInitial.charAt(0).toUpperCase();
    }

    if (lastInitial) {
      this.lastInitial = lastInitial.charAt(0).toUpperCase();
    }
  }
}
