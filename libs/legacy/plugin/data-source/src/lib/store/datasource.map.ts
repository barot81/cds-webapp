import { FusionDataSource } from '../models/Fusion-data-source.model';
import { DataSourceReducer } from './reducers/datasource.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { DataSourceEffects } from './effects/datasource.effects';

  
  export const effects = [
    DataSourceEffects
  ]
