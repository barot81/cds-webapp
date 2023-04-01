import { Injectable } from '@angular/core';
import { ComponentMap } from '@exxat/fusion/core';
import { StepOneContentComponent } from './content/step-one-content/step-one-content.component';
import { StepTwoContentComponent } from './content/step-two-content/step-two-content.component';
import { StepThreeContentComponent } from './content/step-three-content/step-three-content.component';
import { StepFourContentComponent } from './content/step-four-content/step-four-content.component';
import { StepFiveContentComponent } from './content/step-five-content/step-five-content.component';
import { StepSixContentComponent } from './content/step-six-content/step-six-content.component';

@Injectable({providedIn: 'any'})
export class TimelineContentService extends ComponentMap {

    constructor() {

        super();
        this.add('ryzen-step-one-content', StepOneContentComponent);
        this.add('ryzen-step-two-content', StepTwoContentComponent);
        this.add('ryzen-step-three-content', StepThreeContentComponent);
        this.add('ryzen-step-four-content', StepFourContentComponent);
        this.add('ryzen-step-five-content', StepFiveContentComponent);
        this.add('ryzen-step-six-content', StepSixContentComponent);

    }
}
