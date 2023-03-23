import { Component, Host, AfterViewInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { MatPseudoCheckboxState } from '@angular/material/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'select-all-checkbox',
  templateUrl: './select-all.component.html',
})

export class SelectAllComponent implements AfterViewInit, OnDestroy {

  state: MatPseudoCheckboxState = 'checked';

  private options = [];
  private value = [];

  private destroyed = new Subject();

  constructor(@Host() private matSelect: MatSelect) { }

  ngAfterViewInit() {
    this.options = this.matSelect.options.map(x => x.value);
    this.matSelect.options.changes
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.options = this.matSelect.options.map(x => x.value);
        this.updateState();
      });

    this.value = this.matSelect.ngControl.control.value;
    this.matSelect.ngControl.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.value = res;
        this.updateState();
      });
    // ExpressionChangedAfterItHasBeenCheckedError fix...
    setTimeout(() => {
      this.updateState();
    });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onSelectAllClick(evt: MouseEvent) {
    if (this.state === 'checked') {
      this.matSelect.ngControl.control.setValue([]);
    }
    else {
      this.matSelect.ngControl.control.setValue(this.options);
    }

  }

  private updateState() {
    const areAllSelected = this.areArraysEqual(this.value, this.options);
    if (areAllSelected) {
      this.state = 'checked';
    }
    else if (this.value != null && this.value.length > 0 && this.value.length != null) {
      this.state = 'indeterminate'
    }
    else {
      this.state = 'unchecked';
    }
  }

    private areArraysEqual(a, b) {
      if(a != null){
        return [...a].sort().join(',') === [...b].sort().join(',');
      }
    }

}
