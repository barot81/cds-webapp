import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IconsFakeDb } from './icons';

@Component({
  selector: 'icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit, OnDestroy {
  icons: any[];
  filteredIcons: any[];

  ngOnInit(): void {
    this.icons = IconsFakeDb.icons;
    this.filteredIcons = this.icons;
  }

  ngOnDestroy(): void {
  }

  /**
   * Filter icons
   *
   * @param event
   */
  filterIcons(event): void {
    const value = event.target.value;

    this.filteredIcons = this.icons.filter(icon => {
      return icon.name.includes(value) || icon.tags.includes(value);
    });
  }
}
