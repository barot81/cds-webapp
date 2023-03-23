import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataSourceFacade } from './facades/datasource.facade';
import { effects } from './datasource.map';
import { DataSourceReducer } from './reducers/datasource.reducers';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('data-source', DataSourceReducer),
    EffectsModule.forFeature(effects),
  ],
  providers: [DataSourceFacade]
})
export class DataSourceStoreModule {}
