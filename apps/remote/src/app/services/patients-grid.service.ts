import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { PatientGridColInfo } from '../configs/column-info.config';
import { ColumnOption } from "../models/datasource/columnOption.model";

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
      map((columns) => {
        if (columns) return columns;
        return this.getEditColumnsFromLocalStorage();
      })
    );
  }

  getEditColumnsFromLocalStorage(): ColumnOption[] {
    const columnsFromLocalStorage = localStorage.getItem('patient_displaycolumn');
    if (columnsFromLocalStorage) {
      try {
        return (<ColumnOption[]>JSON.parse(columnsFromLocalStorage));
      } catch {
        return [];
      }
    }
    return PatientGridColInfo;
  }
}
