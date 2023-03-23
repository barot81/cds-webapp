import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabNavbarComponent } from './tabnavbar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [TabNavbarComponent],
  declarations: [TabNavbarComponent],
  providers: [],
})
export class TabNavBarModule { }
