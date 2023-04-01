import { ChangeDetectorRef, Component, QueryList, ViewChildren, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';
import { FuseSidebarService, FusePerfectScrollbarDirective, fuseAnimations } from '@zhealthcare/ux';
import { TimelineContentService } from './timeline-content.service';

@Component({
    selector: 'ryzen-sidebar-with-timeline',
    templateUrl: './sidebar-with-timeline.component.html',
    animations: fuseAnimations,
})
export class SidebarWithTimelineComponent {

    @ViewChild("timeLineContentContainer", { read: ViewContainerRef }) container: ViewContainerRef;

    componentRef: any;

    animationDirection: 'left' | 'right' | 'none';

    steps = [
        {
            'title': 'Introduction',
            'content': 'ryzen-step-one-content'
        },
        {
            'title': 'Get the sample code',
            'content': 'ryzen-step-two-content'

        },
        {
            'title': 'Create a Firebase project and Set up your app',
            'content': 'ryzen-step-three-content'

        },
        {
            'title': 'Install the Firebase Command Line Interface',
            'content': 'ryzen-step-four-content'

        },
        {
            'title': 'Deploy and run the web app',
            'content': 'ryzen-step-five-content'

        },
        {
            'title': 'The Functions Directory',
            'content': 'ryzen-step-six-content'

        }
    ];


    courseStepContent: any;
    currentStep: number;

    @ViewChildren(FusePerfectScrollbarDirective)
    fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCourseService} _academyCourseService
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService,
        public timelineContentService: TimelineContentService,
        private resolver: ComponentFactoryResolver
    ) {
        // Set the defaults
        this.animationDirection = 'none';
        this.currentStep = 0;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    ngAfterViewInit(): void {

        this.courseStepContent = this.fuseScrollbarDirectives.find((fuseScrollbarDirective) => {
            return fuseScrollbarDirective.elementRef.nativeElement.id === 'course-step-content';
        });


        this.createComponent(this.timelineContentService.get('ryzen-step-one-content'));
    }


    createComponent(component) {

        this.container.clear();

        const factory = this.resolver.resolveComponentFactory(component);

        this.componentRef = this.container.createComponent(factory);

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Go to step
     *
     * @param step
     */
    gotoStep(step, content): void {

        // Decide the animation direction
        this.animationDirection = this.currentStep < step ? 'left' : 'right';

        // Run change detection so the change
        // in the animation direction registered
        this._changeDetectorRef.detectChanges();

        // Set the current step
        this.currentStep = step;

        setTimeout(() => {
            this.createComponent(this.timelineContentService.get(content));
        });
    }

    /**
     * Go to next step
     */
    // gotoNextStep(): void {
    //     if (this.currentStep === this.course.totalSteps - 1) {
    //         return;
    //     }

    //     // Set the animation direction
    //     this.animationDirection = 'left';

    //     // Run change detection so the change
    //     // in the animation direction registered
    //     this._changeDetectorRef.detectChanges();

    //     // Increase the current step
    //     this.currentStep++;
    // }

    /**
     * Go to previous step
     */
    // gotoPreviousStep(): void {
    //     if (this.currentStep === 0) {
    //         return;
    //     }

    //     // Set the animation direction
    //     this.animationDirection = 'right';

    //     // Run change detection so the change
    //     // in the animation direction registered
    //     this._changeDetectorRef.detectChanges();

    //     // Decrease the current step
    //     this.currentStep--;
    // }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}






