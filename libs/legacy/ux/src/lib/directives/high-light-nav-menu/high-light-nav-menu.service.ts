import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HighLightNavMenuService {

    public selectedNavMenuItem = new BehaviorSubject<string>('');

    public $selectedNavMenuItem = this.selectedNavMenuItem.asObservable();

    public currentNavMenuContent = new BehaviorSubject<string>('');

    public $currentNavMenuContent = this.currentNavMenuContent.asObservable();

    public viewChangeDetector = new BehaviorSubject<boolean>(false);

    public $viewChangeDetector = this.viewChangeDetector.asObservable();

    public setCurrentNavMenuItem(item: string) {
        this.selectedNavMenuItem.next(item);
    }

    public setcurrentNavMenuContent(item: string) {
        this.currentNavMenuContent.next(item);
    }

    public setViewChangeDetector(item: boolean) {
        this.viewChangeDetector.next(item);
    }
}