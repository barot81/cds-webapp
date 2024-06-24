import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent {
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeSnackbar(): void {
    this.close.emit();
  }
}
