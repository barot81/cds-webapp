export class zhealthcareTagOptions {
  saveButton?: boolean;
  tagsListLength?: number;
  tagTitleMaxLength?: number;

  /**
   *
   */
  constructor() {
    this.saveButton = false;
    this.tagsListLength = 0;
    this.tagTitleMaxLength = 50;
  }
}

export enum TagView {
  "LABEL" = 0,
  "CHIP" = 1
}

export declare type MenuTrigger = 'hover' | 'click';
