import { FormGroup } from '@angular/forms';
export class ManifoldPanel {
  componentSelector: any;
  moduleId: string;
  caption: string;
  size: string;
  data: any;
  entityKey: any;
  primaryAction: string;
  secondaryAction: string;
  sideBar: any;
  componentRefHost: any;
  fusionFormGroup: FormGroup;
  primaryActionTemplate: any;
  closeOnNavigation: boolean;

  constructor(componentSelector, moduleId, caption, size, data, entityKey, primaryAction, secondaryAction, closeOnNavigation?, sideBar?, componentRefHost?, fusionFormGroup?, primaryActionTemplate?) {
    this.componentSelector = componentSelector;
    this.moduleId = moduleId;
    this.caption = caption;
    this.size = size;
    this.data = data;
    this.entityKey = entityKey;
    this.primaryAction = primaryAction;
    this.secondaryAction = secondaryAction;
    this.sideBar = sideBar;
    this.componentRefHost = componentRefHost;
    this.fusionFormGroup = fusionFormGroup;
    this.primaryActionTemplate = primaryActionTemplate;
    this.closeOnNavigation = closeOnNavigation;
  }
}
