import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zhealthcare-avatar',
  templateUrl: './zhealthcare-avatar.component.html',
  styleUrls: ['./zhealthcare-avatar.component.scss']
})
export class zhealthcareAvatarComponent implements OnInit {

  @Input() src: string;
  @Input() size: string;
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() editable: boolean;

  firstInitial: string;
  lastInitial: string;

  constructor() {

  }

  ngOnInit() {

    if (this.firstName) {
      this.firstInitial = this.firstName.charAt(0).toUpperCase();
    }

    if (this.lastName) {
      this.lastInitial = this.lastName.charAt(0).toUpperCase();
    }
  }
}
