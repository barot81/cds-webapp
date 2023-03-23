/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  HostListener,
  HostBinding,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

@Directive({
  selector: '[appFileDnd]'
})
export class FileDndDirective {
  @Input() private allowed_extensions: Array<string> = [];
  @Input() public allowMultiple:boolean;
  @Output() private filesChangeEmiter: EventEmitter<
    File[]
  > = new EventEmitter();

  @Output() private filesInvalidEmiter: EventEmitter<
    File[]
  > = new EventEmitter();

  constructor() {}

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files: File[] = evt.dataTransfer.files;
    const valid_files: Array<File> = [];
    const invalid_files: Array<File> = [];
    if (files.length > 0) {
      if(!this.allowMultiple && files.length > 1) {
        valid_files.push(files[0]);
      } else {
      for (const file of files) {   
          valid_files.push(file);
        }
      }
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
  }
}
