import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'any'})
export class FlexTableService {

    public change_detection = new BehaviorSubject<boolean>(false);
    public $change_detection = this.change_detection.asObservable();

    public TriggerChangeDetection(data: boolean) {
        this.change_detection.next(data);
    }

    get AccessChangeDetection() {
        return this.$change_detection;
    }
}
