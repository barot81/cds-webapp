import { Component } from '@angular/core';

import { FormStep } from './../types';

@Component({
  selector: 'scrollable-form-content',
  templateUrl: './scrollable-form-content.component.html',
  styleUrls: ['./scrollable-form-content.component.scss']
})
export class ScrollableFormContentComponent {
  formSteps: Array<FormStep> = [
    {
      id: 'step_0',
      title: 'Step 0',
      status: 0,
      children: [
        {
          id: 'step_0.1',
          title: 'Sub Menu 0.1',
          status: 0
        },
        {
          id: 'step_0.2',
          title: 'Sub Menu 0.2',
          status: 0
        }
      ]
    },
    {
      id: 'step_1',
      title: 'Step 1',
      status: 0,
      children: [
        {
          id: 'step_1.1',
          title: 'Sub Menu 1.1',
          status: 0
        },
        {
          id: 'step_1.2',
          title: 'Sub Menu 1.2',
          status: 0
        },
        {
          id: 'step_1.3',
          title: 'Sub Menu 1.3',
          status: 0
        }
      ]
    },
    {
      id: 'step_2',
      title: 'Step 2',
      status: 1,
      children: [
        {
          id: 'step_2.1',
          title: 'Sub Menu 2.1',
          status: 0,
          children: [
            {
              id: 'step_2.1.1',
              title:
                'Sub Sub Menu Lorem ips Sub Sub Menu Lorem ips Sub Sub Menu Lorem ips',
              status: 1
            },
            {
              id: 'step_2.1.2',
              title: 'Sub Sub Menu 2.1.2',
              status: 0
            }
          ]
        },
        {
          id: 'step_2.2',
          title: 'Sub Menu 2.2',
          status: 0
        }
      ]
    },
    {
      id: 'step_3',
      title: 'Step 3',
      status: 2,
      children: [
        {
          id: 'step_3.1',
          title: 'Sub Menu 3.1',
          status: 2
        },
        {
          id: 'step_3.2',
          title: 'Sub Menu 3.2',
          status: 2
        }
      ]
    },
    {
      id: 'step_4',
      title: 'Step 4',
      status: 2
    },
    {
      id: 'step_5',
      title: 'Step 5',
      status: 2
    },
    {
      id: 'step_final',
      title: 'Final step',
      status: 2
    }
  ];
}
