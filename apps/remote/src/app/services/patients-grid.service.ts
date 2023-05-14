import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ColumnOption } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class PatientGridService {
  editColumns$: Subject<ColumnOption[]> = new BehaviorSubject([]);

  constructor() {
    this.editColumns$.next(this.getEditColumnsFromLocalStorage());
  }
  updateEditColumns(displayColumns: ColumnOption[]) {
    localStorage.setItem(
      'patient_displaycolumn',
      JSON.stringify(displayColumns)
    );
    this.editColumns$.next(displayColumns);
  }

  getEditColumns(): Observable<ColumnOption[]> {
    return this.editColumns$.pipe(
      map((x) => {
        const columns = x?.filter((y) => y.isDisplayColumn);
        if (columns) return columns;
        return this.getEditColumnsFromLocalStorage();
      })
    );
  }

  getEditColumnsFromLocalStorage(): ColumnOption[] {
    const columnsFromLocalStorage = localStorage.getItem('patient_displaycolumn');
    if (columnsFromLocalStorage) {
      try {
        return (<ColumnOption[]>JSON.parse(columnsFromLocalStorage)).filter(
          (x) => x.isDisplayColumn
        );
      } catch {
        return [];
      }
    }
  }
}
