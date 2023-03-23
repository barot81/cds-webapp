import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { ChipsCharSlice } from './chips-char-slice.pipe';
import { GetDatePipe } from "./get-date.pipe";
import { GetDurationPipe } from "./get-duration.pipe";
import { TimeAgoPipe } from "./time-ago.pipe";
import { SearchPipe } from "./search.pipe";
import { SearchResolverPipe } from "./search-resolver.pipe";
import { EntitySearchPipe } from "./entity-search.pipe";
import { TruncatePipe } from './truncate.pipe';
import { HighlightSearchPipe } from './highlightText.pipe';

@NgModule({
  declarations: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    GetDatePipe,
    GetDurationPipe,
    TimeAgoPipe,
    SearchPipe,
    SearchResolverPipe,
    EntitySearchPipe,
    TruncatePipe,
    HighlightSearchPipe,
    ChipsCharSlice
  ],
  imports: [],
  exports: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    GetDatePipe,
    GetDurationPipe,
    TimeAgoPipe,
    SearchPipe,
    SearchResolverPipe,
    EntitySearchPipe,
    TruncatePipe,
    HighlightSearchPipe,
    ChipsCharSlice
  ]
})
export class FusePipesModule {
}
