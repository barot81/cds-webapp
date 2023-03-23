import { ElementRef } from '@angular/core';

export class FocusElementInfo {
  constructor(
    public focusElement: ElementRef<HTMLElement>,
    public focusedBtnClass: string,
    public drawerInstanceId?: number
  ) {}
}
