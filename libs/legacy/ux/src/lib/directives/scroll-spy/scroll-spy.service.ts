import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'any'})
export class ScrollSpyService {

    //#region  [SERVICE VARIABLES]

    private selectedScrollSpyListItem = new BehaviorSubject<string>('');
    private currentScrollSpyContentItem = new BehaviorSubject<string>('');
    private changeDetection = new BehaviorSubject<boolean>(false);
    private loading = new BehaviorSubject<boolean>(false);

    public $selectedScrollSpyListItem = this.selectedScrollSpyListItem.asObservable();
    public $currentScrollSpyContentItem = this.currentScrollSpyContentItem.asObservable();
    public $changeDetection = this.changeDetection.asObservable();
    public $loading = this.loading.asObservable();

    //#endregion

    //#region  [PUBLIC METHODS]

    public setSelectedScrollSpyListItem(item: string) {
        if (item && item.length > 0) {
            item = item.trim().toLowerCase();
            this.selectedScrollSpyListItem.next(item);
        }
    }

    public setCurrentScrollSpyContentItem(item: string) {
        if (item && item.length > 0) {
            item = item.trim().toLowerCase();
            this.currentScrollSpyContentItem.next(item);
        }
    }

    public triggerChangeDetection(item: boolean) {
        this.changeDetection.next(item);
    }

    public setLoading(item: boolean) {
        this.loading.next(item);
    }

    //#endregion

}
