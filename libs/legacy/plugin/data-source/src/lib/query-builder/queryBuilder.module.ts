import { QueryConfiguration } from './queryConfiguration';
import { QueryBuilder } from './queryBuilder';
import { QueryConfigurationFactory } from './service/queryConfigurationFactory';
import { NgModule } from '@angular/core';

export function QueryBuilderFuction(){
    return new QueryConfigurationFactory();
}
@NgModule({
  declarations: [],
  imports: [],
  providers: [
      QueryBuilder, 
      { 
          provide: QueryConfiguration, 
          useFactory : QueryBuilderFuction
    }],
  bootstrap: []
})
export class QueryBuilderModule { }
