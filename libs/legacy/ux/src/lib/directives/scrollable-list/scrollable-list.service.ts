import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollableListService {
  public selectedMenuItem = new BehaviorSubject<string>('');

  public $selectedMenuItem = this.selectedMenuItem.asObservable();

  public currentMenuContent = new BehaviorSubject<string>('');

  public $currentNavMenuContent = this.currentMenuContent.asObservable();

  public viewChangeDetector = new BehaviorSubject<boolean>(false);

  public $viewChangeDetector = this.viewChangeDetector.asObservable();

  public setCurrentMenuItem(item: string) {
    this.selectedMenuItem.next(item);
  }

  public setcurrentMenuContent(item: string) {
    this.currentMenuContent.next(item);
  }

  public setViewChangeDetector(item: boolean) {
    this.viewChangeDetector.next(item);
  }
}
