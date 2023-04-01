import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'any'})
export class StickyTableHeaderLayoutService {
  private container_header_height = new BehaviorSubject<number>(0);
  public container_header_height$ = this.container_header_height.asObservable();

  private conditional_content_height = new BehaviorSubject<number>(0);
  public conditional_content_height$ = this.conditional_content_height.asObservable();

  public setContainerHeaderHeight(height: number): void {
    this.container_header_height.next(height);
  }

  public setConditionContentHeight(height: number):void {
    this.conditional_content_height.next(height);
  }

  public get containerHeaderHeight(): number {
    return this.container_header_height.value;
  }

  public get conditionalContentHeight(): number{
    return this.conditional_content_height.value
  }
}
