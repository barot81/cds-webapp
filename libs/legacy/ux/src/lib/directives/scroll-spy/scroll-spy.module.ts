import { NgModule } from '@angular/core';
import { ScrollSpyContentDirective } from './scroll-spy-content.directive';
import { ScrollSpyListDirective } from './scroll-spy-list.directive';
import { ScrollSpyService } from './scroll-spy.service';

@NgModule({
    declarations: [ScrollSpyListDirective, ScrollSpyContentDirective],
    providers: [ScrollSpyService],
    exports: [ScrollSpyListDirective, ScrollSpyContentDirective]
})
export class ScrollSpyModule {
}