import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'exxat-content-header',
  templateUrl: './content-header.component.html',
})
export class ContentHeaderComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedId: number = 1;
  students: any[] = [
    { id: 0, name: 'Anna Strong' },
    { id: 1, name: 'James Strong' },
    { id: 2, name: 'Peter Strong' },
    { id: 3, name: 'Mindy Strong' },
    { id: 4, name: 'Danny Strong' },
    { id: 5, name: 'Jeremy Strong' },
    { id: 6, name: 'Morgan Strong' },
    { id: 7, name: 'Tam Strong' },
    { id: 8, name: 'Anna Strong' },
    { id: 9, name: 'Anna Strong' },
  ];
}
