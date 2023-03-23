import { Pipe, PipeTransform } from '@angular/core';
import { FileType } from '../models/fileType';

@Pipe({
  name: 'supportedTypes',
})
export class SupportedFormatPipe implements PipeTransform {
  transform(value: FileType, customFileType: string = '') {
    switch (value) {
      case FileType.Document:
        return '.pdf,.doc,.docx,.pptx,.pptm,.potx,.potm';
      case FileType.Image:
        return '.jpg,.jpeg,.png';
      case FileType.Package:
        return '.zip,.rar,.gzip';
      case FileType.Custom:
        return customFileType;
      default:
        return '.pdf,.doc,.jpg,.jpeg,.png,.docx,.xlsx,.pptx,.pptm,.potx,.potm';
    }
  }
}
