import { Component } from '@angular/core';

interface Prop {
  title: string;
  description: string;
}

@Component({
  selector: 'tooltip-configuration',
  templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent {
  props: Prop[] = [
    {
      title: 'contentType',
      description:
        'Specify the content Type of tooltip. Options are [ "component" | "template" | "string" ].'
    },
    {
      title: 'theme',
      description:
        'Specify the theme for tooltip. Options are [ "light" | "dark" ].'
    },
    {
      title: 'interactive',
      description:
        'Boolean property which will make tooltip interactive. If set to true then Tooltip Will not close on the click or hover of it.'
    },
    {
      title: 'max-width',
      description:
        'Specify the maximum width for the tooltip. Ex. max-width: 450'
    },
    {
      title: 'placement',
      description:
        'Specify the position of the tooltip. Options are [ "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"]'
    },
    {
      title: 'trigger',
      description:
        'Specify the trigger event to open the tooltip. Options are [ "click" | "hover" ]'
    },
    {
      title: 'display',
      description: 'Boolean property which will decide tooltip visibility.'
    },
    {
      title: 'pointerEvents',
      description:
        'Make tooltip interactive. Options are [ "auto" | "none" ]. If value is set to "auto" then tooltip will be interactive and with value "none" it will be default.'
    }
  ];
}
