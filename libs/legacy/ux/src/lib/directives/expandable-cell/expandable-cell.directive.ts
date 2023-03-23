import { Renderer2, Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
    selector: '[expandable-cell]',
    exportAs: 'expandable-cell'
})
export class ExpandableCellDirective implements AfterViewInit {
    private el: HTMLElement;
    private expandable_cell_class = 'expandable-cell';
    private expanded_cell_class = 'expanded-cell';
    private classList: Array<string>;
    private currentColumn: string;
    private tableContent: HTMLElement;
    private columnCellList = new Array<Element>();

    constructor(
        private readonly elRef: ElementRef,
        private readonly renderer: Renderer2
    ) {
        this.setElement();
        this.addExpandableCellClass();
    }

    ngAfterViewInit(): void {
        this.setElement();
        this.addExpandableCellClass();
    }

    private setElement() {
        if (this.elRef && this.elRef.nativeElement) {
            this.el = this.elRef.nativeElement;
            this.tableContent = this.elRef.nativeElement.closest('.expandable-cell-grid');
        }
    }

    @HostListener('mouseover', ['$event'])
    async onMouseOver(e) {
        await this.getColumnofCell();
        await this.setColumnCellList();
    }

    @HostListener('mouseout', ['$event'])
    async onMouseOut(e) {
        if (this.columnCellList.length > 0) {
            await this.removeExpandedClass();
        }
        this.columnCellList = new Array<Element>();
        this.currentColumn = '';
        this.classList = new Array<string>();
    }

    private addExpandableCellClass() {
        this.renderer.addClass(this.el, this.expandable_cell_class);
    }

    private setColumnCellList() {
        this.columnCellList = Array.from(this.tableContent.getElementsByClassName(this.currentColumn));
        if (this.columnCellList.length > 0) {
            this.addExpandedClass();
        }
    }

    private addExpandedClass() {
        this.columnCellList.forEach(element => {
            this.renderer.removeClass(element, this.expandable_cell_class);
            this.renderer.addClass(element, this.expanded_cell_class);
        });
    }

    private removeExpandedClass() {
        this.columnCellList.forEach(element => {
            this.renderer.removeClass(element, this.expanded_cell_class);
            this.renderer.addClass(element, this.expandable_cell_class);
        });
    }

    private getColumnofCell() {
        this.classList = this.el.getAttribute('class').split(' ');
        this.classList.forEach((element) => {
            if (element.startsWith('cdk-column')) {
                this.currentColumn = element;
            }
        });
    }

}