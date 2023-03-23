import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeywordDictionaryPipe } from './keywords/keyword-dictionary.pipe';
import { LookUpsPipe } from './lookups/lookups.pipe';
import { LabelDictionaryPipe } from './lookups/setting-dictionary.pipe';
import { MarkdownPipe } from './md-to-html/markdown-to-html.pipe';
import { SafeHTMLPipe } from './safe-html/safe-html.pipe';
import { TimezonePipe } from './timezone/timezone.pipe';

@NgModule({
  declarations: [
    LookUpsPipe,
    KeywordDictionaryPipe,
    TimezonePipe,
    SafeHTMLPipe,
    MarkdownPipe,
    LabelDictionaryPipe,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    LookUpsPipe,
    KeywordDictionaryPipe,
    TimezonePipe,
    SafeHTMLPipe,
    MarkdownPipe,
    LabelDictionaryPipe,
  ],
})
export class FeatureMetaDataPipesModule {}
